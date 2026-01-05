import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export default function AdminIncidentReview() {
  const { user, loading } = useAuth();
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    const res = await axios.get(
      "http://localhost:4567/incidents/admin/pending",
      {
        withCredentials: true,
      }
    );
    setItems(res.data?.data || []);
  };

  useEffect(() => {
    const run = async () => {
      try {
        await load();
      } catch (e) {
        setErr(
          e?.response?.data?.message || "Failed to load pending incidents"
        );
      }
    };
    if (user) run();
  }, [user]);

  const setStatus = async (id, status) => {
    setBusyId(id);
    try {
      await axios.patch(
        `http://localhost:4567/incidents/admin/${id}/status`,
        { status },
        { withCredentials: true }
      );
      await load();
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to update incident");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <div className="p-6">Loading…</div>;
  if (!user) return <div className="p-6">Unauthorized</div>;
  if (user.role !== "admin") return <div className="p-6">Forbidden</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Incident Moderation</h1>
      {err && <div className="text-red-600 mb-3">{err}</div>}
      {items.length === 0 ? (
        <div className="text-gray-600">No pending incidents.</div>
      ) : (
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it._id} className="glass-card p-4">
              <div className="flex justify-between gap-3">
                <div className="font-semibold">{it.title}</div>
                <div className="text-xs text-gray-500">{it.disasterType}</div>
              </div>
              <div className="text-gray-700 mt-2 whitespace-pre-wrap">
                {it.description}
              </div>
              <div className="text-xs text-gray-500 mt-2">
                {it.locationText}
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  className="glass-btn"
                  disabled={busyId === it._id}
                  onClick={() => setStatus(it._id, "approved")}
                >
                  Approve
                </button>
                <button
                  className="glass-btn"
                  disabled={busyId === it._id}
                  onClick={() => setStatus(it._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
