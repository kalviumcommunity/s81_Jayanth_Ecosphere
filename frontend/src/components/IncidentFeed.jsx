import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

export default function IncidentFeed() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [volunteers, setVolunteers] = useState([]);
  const [busyId, setBusyId] = useState(null);
  const [actionError, setActionError] = useState("");
  const [selectedVolunteer, setSelectedVolunteer] = useState({});

  const isNgo = user?.role === "ngo";
  const isUserReporter = user?.role === "user" || user?.role === "victim";

  useEffect(() => {
    const run = async () => {
      try {
        const res = isUserReporter
          ? await axios.get("http://localhost:4567/incidents/my", {
              withCredentials: true,
            })
          : await axios.get("http://localhost:4567/incidents/feed");
        setItems(res.data?.data || []);
      } catch (e) {
        setError("Failed to load incidents");
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [isUserReporter]);

  const reload = async () => {
    const res = isUserReporter
      ? await axios.get("http://localhost:4567/incidents/my", {
          withCredentials: true,
        })
      : await axios.get("http://localhost:4567/incidents/feed");
    setItems(res.data?.data || []);
  };

  useEffect(() => {
    const loadVolunteers = async () => {
      if (!isNgo) return;
      try {
        const res = await axios.get(
          "http://localhost:4567/incidents/ngo/volunteers",
          { withCredentials: true }
        );
        setVolunteers(res.data?.data || []);
      } catch {
        setVolunteers([]);
      }
    };
    loadVolunteers();
  }, [isNgo]);

  const takeTask = async (incidentId) => {
    setActionError("");
    setBusyId(incidentId);
    try {
      await axios.post(
        `http://localhost:4567/incidents/${incidentId}/take`,
        {},
        { withCredentials: true }
      );
      await reload();
    } catch (e) {
      setActionError(e?.response?.data?.message || "Failed to take task");
    } finally {
      setBusyId(null);
    }
  };

  const assignVolunteer = async (incidentId) => {
    setActionError("");
    setBusyId(incidentId);
    try {
      const volunteerId = selectedVolunteer[incidentId];
      if (!volunteerId) {
        setActionError("Select a volunteer first");
        return;
      }
      await axios.post(
        `http://localhost:4567/incidents/${incidentId}/request-volunteer`,
        { volunteerId },
        { withCredentials: true }
      );
      await reload();
    } catch (e) {
      setActionError(
        e?.response?.data?.message || "Failed to request volunteer"
      );
    } finally {
      setBusyId(null);
    }
  };

  if (loading) return <div className="p-6">Loading incidents…</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {isUserReporter ? "My Incidents" : "Public Incident Feed"}
      </h1>
      {actionError && <div className="text-red-600 mb-3">{actionError}</div>}
      {items.length === 0 ? (
        <div className="text-gray-600">
          {isUserReporter
            ? "You haven't submitted any incidents yet."
            : "No approved incidents yet."}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((it) => (
            <div key={it._id} className="glass-card p-4">
              <div className="flex justify-between gap-3">
                <div className="font-semibold">{it.title}</div>
                <div className="text-xs text-gray-500">{it.disasterType}</div>
              </div>

              {isUserReporter && (
                <div className="text-xs text-gray-600 mt-1">
                  Status: {it.status}
                </div>
              )}

              <div className="text-gray-700 mt-2 whitespace-pre-wrap">
                {it.description}
              </div>
              {it.locationText && (
                <div className="text-sm text-gray-500 mt-2">
                  {it.locationText}
                </div>
              )}
              {Array.isArray(it.media) && it.media.length > 0 && (
                <div className="text-sm text-gray-600 mt-2">
                  Media: {it.media.length} file(s)
                </div>
              )}

              {isNgo && (
                <div className="mt-4 border-t border-gray-200 pt-3">
                  <div className="text-xs text-gray-600 mb-2">
                    Task status: {it.responseStatus || "open"}
                  </div>

                  {!it.assignedNgoId && (
                    <button
                      className="glass-btn"
                      disabled={busyId === it._id}
                      onClick={() => takeTask(it._id)}
                    >
                      Take Task
                    </button>
                  )}

                  {it.assignedNgoId === user?._id && (
                    <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                      <select
                        className="glass-input flex-1"
                        value={selectedVolunteer[it._id] || ""}
                        onChange={(e) =>
                          setSelectedVolunteer((prev) => ({
                            ...prev,
                            [it._id]: e.target.value,
                          }))
                        }
                      >
                        <option value="">Assign a volunteer…</option>
                        {volunteers.map((v) => (
                          <option key={v._id} value={v._id}>
                            {v.name || v.email}
                          </option>
                        ))}
                      </select>

                      <button
                        className="glass-btn"
                        disabled={busyId === it._id}
                        onClick={() => assignVolunteer(it._id)}
                      >
                        Send Request
                      </button>
                    </div>
                  )}

                  {it.assignedNgoId && it.assignedNgoId !== user?._id && (
                    <div className="text-sm text-gray-600">
                      Claimed by another NGO.
                    </div>
                  )}

                  {it.responseStatus === "requested" && (
                    <div className="text-sm text-gray-700 mt-2">
                      Volunteer request pending.
                    </div>
                  )}

                  {it.assignedVolunteerId && (
                    <div className="text-sm text-gray-700 mt-2">
                      Assigned to a volunteer.
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
