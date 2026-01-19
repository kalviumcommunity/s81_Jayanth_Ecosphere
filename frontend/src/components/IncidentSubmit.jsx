import React, { useState } from "react";
import axios from "axios";
import { buildBackendUrl } from "../utils/apiConfig";

export default function IncidentSubmit() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [disasterType, setDisasterType] = useState("other");
  const [locationText, setLocationText] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  const submit = async () => {
    setError("");
    setOk(false);
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("title", title);
      fd.append("description", description);
      fd.append("disasterType", disasterType);
      fd.append("locationText", locationText);
      for (const f of files) fd.append("media", f);

      await axios.post(buildBackendUrl("/incidents/submit"), fd, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setOk(true);
      setTitle("");
      setDescription("");
      setLocationText("");
      setFiles([]);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to submit incident");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Submit Incident Report</h1>

      <div className="glass-card p-4 space-y-3">
        <input
          className="glass-input w-full"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="glass-input w-full min-h-[120px]"
          placeholder="Describe what happened"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="glass-input w-full"
          value={disasterType}
          onChange={(e) => setDisasterType(e.target.value)}
        >
          <option value="other">Other</option>
          <option value="flood">Flood</option>
          <option value="cyclone">Cyclone</option>
          <option value="earthquake">Earthquake</option>
          <option value="wildfire">Wildfire</option>
          <option value="landslide">Landslide</option>
          <option value="tsunami">Tsunami</option>
        </select>

        <input
          className="glass-input w-full"
          placeholder="Location (optional)"
          value={locationText}
          onChange={(e) => setLocationText(e.target.value)}
        />

        <input
          className="w-full"
          type="file"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
        />

        {ok && (
          <div className="text-green-700 text-sm">
            Submitted. Awaiting admin approval.
          </div>
        )}
        {error && <div className="text-red-600 text-sm">{error}</div>}

        <button
          className="glass-btn w-full"
          disabled={loading}
          onClick={submit}
        >
          {loading ? "Submitting…" : "Submit"}
        </button>
      </div>
    </div>
  );
}
