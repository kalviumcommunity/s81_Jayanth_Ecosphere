import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { buildBackendUrl } from "../utils/apiConfig";

export default function AssistancePending() {
  const { user, loading } = useAuth();
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    const res = await axios.get(buildBackendUrl("/assist/pending"), {
      withCredentials: true,
    });
    setItems(res.data?.data || []);
  };

  useEffect(() => {
    const run = async () => {
      try {
        await load();
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load pending requests");
      }
    };
    if (user) run();
  }, [user]);

  const accept = async (id) => {
    setBusyId(id);
    try {
      await axios.post(
        buildBackendUrl(`/assist/requests/${id}/accept`),
        {},
        { withCredentials: true }
      );
      await load();
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to accept");
    } finally {
      setBusyId(null);
    }
  };

  const mark = async (id, status) => {
    setBusyId(id);
    try {
      await axios.patch(
        buildBackendUrl(`/assist/requests/${id}/status`),
        { status },
        { withCredentials: true }
      );
      await load();
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to update status");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <div className="p-6">Loading…</div>;
  if (!user) return <div className="p-6">Unauthorized</div>;

  const canWork = ["volunteer", "ngo", "admin"].includes(user.role);
  if (!canWork) return <div className="p-6">Forbidden</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-1">Tasks</h1>
      <div className="text-sm text-gray-600 mb-4">
        Take a task to assign it to you, then mark it completed.
      </div>
      {err && <div className="text-red-600 mb-3">{err}</div>}
      {items.length === 0 ? (
        <div className="text-gray-600">No tasks available.</div>
      ) : (
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it._id} className="glass-card p-4">
              <div className="flex justify-between gap-3">
                <div className="font-semibold">{it.title}</div>
                <div className="text-sm">{it.status}</div>
              </div>
              <div className="text-gray-700 mt-2">{it.description}</div>
              <div className="text-xs text-gray-500 mt-2">
                {it.category}
                {it.location?.city ? ` • ${it.location.city}` : ""}
                {it.status === "accepted" && it.assignedToId === user?._id
                  ? " • assigned to you"
                  : ""}
              </div>

              <div className="flex gap-2 mt-3">
                {it.status === "pending" && (
                  <button
                    className="glass-btn"
                    disabled={busyId === it._id}
                    onClick={() => accept(it._id)}
                  >
                    Take Task
                  </button>
                )}
                {it.status === "accepted" && (
                  <>
                    <button
                      className="glass-btn"
                      disabled={busyId === it._id}
                      onClick={() => mark(it._id, "completed")}
                    >
                      Complete
                    </button>
                    <button
                      className="glass-btn"
                      disabled={busyId === it._id}
                      onClick={() => mark(it._id, "rejected")}
                    >
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
