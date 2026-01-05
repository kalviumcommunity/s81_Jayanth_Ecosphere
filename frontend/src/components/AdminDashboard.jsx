import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto my-12 p-6 glass-card">
        <div className="text-center">Loading…</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-5xl mx-auto my-12 p-6 glass-card">
        <div className="text-center">Unauthorized</div>
      </div>
    );
  }

  if (user.role !== "admin") {
    return (
      <div className="max-w-5xl mx-auto my-12 p-6 glass-card">
        <div className="text-center">Forbidden</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-12 p-6 glass-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
            Admin Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Review incidents and verify NGO accounts.
          </p>
        </div>
        <button className="glass-btn" onClick={() => navigate("/settings")}>
          Settings
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="p-4 glass-card">
          <h3 className="font-semibold mb-2">Incident Review</h3>
          <p className="text-sm text-gray-600 mb-3">
            Approve or reject submitted incidents.
          </p>
          <button
            className="glass-btn"
            onClick={() => navigate("/incidents/admin")}
          >
            Review Incidents
          </button>
        </div>

        <div className="p-4 glass-card">
          <h3 className="font-semibold mb-2">NGO Verification</h3>
          <p className="text-sm text-gray-600 mb-3">
            Verify NGO registrations.
          </p>
          <button className="glass-btn" onClick={() => navigate("/admin/ngos")}>
            Verify NGOs
          </button>
        </div>
      </div>
    </div>
  );
}
