import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Dashboard() {
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

  const role = user?.role;

  const goRoleHome = () => {
    if (role === "volunteer") return navigate("/volunteer");
    if (role === "ngo") return navigate("/ngo/dashboard");
    if (role === "admin") return navigate("/admin/dashboard");
    return navigate("/user/dashboard");
  };

  return (
    <div className="max-w-5xl mx-auto my-12 p-6 glass-card">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
        Dashboard
      </h1>
      <p className="text-gray-600 mt-1">
        Welcome{user?.name ? `, ${user.name}` : ""}.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="glass-btn" onClick={goRoleHome}>
          Open My Dashboard
        </button>
        <button className="glass-btn" onClick={() => navigate("/settings")}>
          Settings
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-600">
        Role: <span className="font-semibold text-gray-800">{role}</span>
      </div>
    </div>
  );
}
