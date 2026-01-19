import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { buildBackendUrl } from "../utils/apiConfig";

export default function MyDonations() {
  const { user, loading } = useAuth();
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const run = async () => {
      try {
        const res = await axios.get(buildBackendUrl("/donate/my"), {
          withCredentials: true,
        });
        setItems(res.data?.data || []);
      } catch (e) {
        setErr(e?.response?.data?.message || "Failed to load donations");
      }
    };
    if (user) run();
  }, [user]);

  if (loading) return <div className="p-6">Loading…</div>;
  if (!user) return <div className="p-6">Unauthorized</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Donations</h1>
      {err && <div className="text-red-600 mb-3">{err}</div>}
      {items.length === 0 ? (
        <div className="text-gray-600">No donations yet.</div>
      ) : (
        <div className="space-y-3">
          {items.map((d) => (
            <div key={d._id} className="glass-card p-4">
              <div className="flex justify-between gap-3">
                <div className="font-semibold">{d.itemName}</div>
                <div className="text-sm">{d.paymentStatus}</div>
              </div>
              <div className="text-gray-700 mt-2">₹{d.amountInr}</div>
              <div className="text-xs text-gray-500 mt-2">
                {d.transactionId || ""}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
