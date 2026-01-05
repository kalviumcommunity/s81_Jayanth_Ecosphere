import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function AssistanceNew() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("other");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    setError("");
    setSaving(true);
    try {
      await axios.post(
        "http://localhost:4567/assist/requests",
        {
          title,
          category,
          description,
          location: { city },
        },
        { withCredentials: true }
      );
      navigate("/assistance/my");
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to create request");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading…</div>;
  if (!user) return <div className="p-6">Unauthorized</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Assistance Request</h1>
      <div className="glass-card p-4 space-y-3">
        <input
          className="glass-input w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          className="glass-input w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="medical">Medical</option>
          <option value="food">Food</option>
          <option value="shelter">Shelter</option>
          <option value="rescue">Rescue</option>
          <option value="other">Other</option>
        </select>

        <textarea
          className="glass-input w-full min-h-[120px]"
          placeholder="Describe your needs"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          className="glass-input w-full"
          placeholder="City (optional)"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button className="glass-btn w-full" disabled={saving} onClick={submit}>
          {saving ? "Submitting…" : "Submit"}
        </button>
      </div>
    </div>
  );
}
