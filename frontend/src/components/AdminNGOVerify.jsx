import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { buildBackendUrl } from "../utils/apiConfig";

export default function AdminNGOVerify() {
  const { user, loading } = useAuth();
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");
  const [busyId, setBusyId] = useState(null);

  const load = async () => {
    const res = await axios.get(buildBackendUrl("/admin/ngos"), {
      withCredentials: true,
    });
    setItems(res.data?.data || []);
  };

  useEffect(() => {
    const run = async () => {
      try {
        await load();
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load NGOs");
      }
    };
    if (user) run();
  }, [user]);

  const verify = async (id) => {
    setBusyId(id);
    try {
      await axios.patch(
        buildBackendUrl(`/admin/ngos/${id}/verify`),
        {},
        { withCredentials: true }
      );
      await load();
    } catch (e) {
      setErr(e?.response?.data?.message || "Failed to verify NGO");
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <div className="p-6">Loading…</div>;
  if (!user) return <div className="p-6">Unauthorized</div>;
  if (user.role !== "admin") return <div className="p-6">Forbidden</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">NGO Verification</h1>
      {err && <div className="text-red-600 mb-3">{err}</div>}

      {items.length === 0 ? (
        <div className="text-gray-600">No NGOs found.</div>
      ) : (
        <div className="space-y-3">
          {items.map((ngo) => (
            <div
              key={ngo._id}
              className="glass-card p-4 flex justify-between items-center gap-3"
            >
              <div>
                <div className="font-semibold">{ngo.name}</div>
                <div className="text-xs text-gray-600">{ngo.email}</div>
                <div className="text-xs text-gray-500 mt-1">
                  Status:{" "}
                  {ngo.ngoVerified
                    ? "Verified"
                    : ngo.ngoRequest
                    ? "Pending verification"
                    : "Not requested"}
                </div>
                <div className="text-xs text-gray-500">
                  Role: {ngo.role || "-"}
                </div>
              </div>
              {!ngo.ngoVerified && (
                <button
                  className="glass-btn"
                  disabled={busyId === ngo._id}
                  onClick={() => verify(ngo._id)}
                >
                  Verify
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
