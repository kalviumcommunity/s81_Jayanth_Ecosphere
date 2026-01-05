import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function UserDashboard() {
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

  if (!(user.role === "user" || user.role === "victim")) {
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
            {user.role === "victim" ? "Victim" : "User"} Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Quick actions for assistance, incidents, and donations.
          </p>
        </div>
        <button className="glass-btn" onClick={() => navigate("/settings")}>
          Settings
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="p-4 glass-card">
          <h3 className="font-semibold mb-2">Assistance</h3>
          <div className="flex flex-wrap gap-2">
            <button
              className="glass-btn"
              onClick={() => navigate("/assistance/new")}
            >
              Request Assistance
            </button>
            <button
              className="glass-btn"
              onClick={() => navigate("/assistance/my")}
            >
              My Assistance
            </button>
          </div>
        </div>

        <div className="p-4 glass-card">
          <h3 className="font-semibold mb-2">Incidents</h3>
          <div className="flex flex-wrap gap-2">
            <button
              className="glass-btn"
              onClick={() => navigate("/incidents")}
            >
              My Incidents
            </button>
            <button
              className="glass-btn"
              onClick={() => navigate("/incidents/submit")}
            >
              Report Incident
            </button>
          </div>
        </div>

        <div className="p-4 glass-card md:col-span-2">
          <h3 className="font-semibold mb-2">Donations</h3>
          <div className="flex flex-wrap gap-2">
            <button className="glass-btn" onClick={() => navigate("/donate")}>
              Donate
            </button>
            <button
              className="glass-btn"
              onClick={() => navigate("/donations")}
            >
              My Donations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
