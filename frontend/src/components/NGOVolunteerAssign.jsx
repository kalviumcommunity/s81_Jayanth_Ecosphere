import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { buildBackendUrl } from "../utils/apiConfig";

export default function NGOVolunteerAssign() {
  const { user, loading: authLoading } = useAuth();

  const [volunteers, setVolunteers] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [selectedIncidentId, setSelectedIncidentId] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busyVolunteerId, setBusyVolunteerId] = useState(null);
  const [success, setSuccess] = useState("");

  const selectedIncident = useMemo(
    () => incidents.find((i) => String(i._id) === String(selectedIncidentId)),
    [incidents, selectedIncidentId]
  );

  const load = async () => {
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const [vRes, iRes] = await Promise.all([
        axios.get(buildBackendUrl("/incidents/ngo/volunteers"), {
          withCredentials: true,
        }),
        axios.get(buildBackendUrl("/incidents/ngo/my"), {
          withCredentials: true,
        }),
      ]);
      setVolunteers(vRes.data?.data || []);
      setIncidents(iRes.data?.data || []);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to load NGO data");
      setVolunteers([]);
      setIncidents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getVolunteerLocation = (v) => {
    const a = Array.isArray(v?.address) ? v.address[0] : null;
    const city = a?.city || "";
    const country = a?.country || "";
    const profileAddr = v?.profile?.address || "";

    const short = [city, country].filter(Boolean).join(", ");
    if (short) return short;
    if (profileAddr) return profileAddr;
    return "Location not provided";
  };

  const requestVolunteer = async (volunteerId) => {
    setSuccess("");
    setError("");

    if (!selectedIncidentId) {
      setError("Select an incident first");
      return;
    }

    setBusyVolunteerId(volunteerId);
    try {
      await axios.post(
        buildBackendUrl(`/incidents/${selectedIncidentId}/request-volunteer`),
        { volunteerId },
        { withCredentials: true }
      );
      setSuccess("Request sent to volunteer. Waiting for acceptance.");
      await load();
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to send request");
    } finally {
      setBusyVolunteerId(null);
    }
  };

  if (authLoading) return <div className="p-6">Loading…</div>;
  if (!user) return <div className="p-6">Unauthorized</div>;
  if (user.role !== "ngo") return <div className="p-6">Forbidden</div>;

  if (loading) return <div className="p-6">Loading NGO dashboard…</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">NGO • Assign Volunteers</h1>
      <p className="text-gray-600 mb-4">
        Pick one of your claimed incidents, then send a request to a volunteer.
      </p>

      {error && <div className="text-red-600 mb-3">{error}</div>}
      {success && <div className="text-green-700 mb-3">{success}</div>}

      <div className="glass-card p-4 mb-5">
        <div className="font-semibold mb-2">Select Incident</div>
        <select
          className="glass-input w-full"
          value={selectedIncidentId}
          onChange={(e) => setSelectedIncidentId(e.target.value)}
        >
          <option value="">Choose an incident…</option>
          {incidents.map((it) => (
            <option key={it._id} value={it._id}>
              {it.title} • {it.responseStatus}
            </option>
          ))}
        </select>

        {selectedIncident && (
          <div className="text-sm text-gray-700 mt-3">
            <div className="font-semibold">{selectedIncident.title}</div>
            {selectedIncident.locationText && (
              <div className="text-gray-600">
                {selectedIncident.locationText}
              </div>
            )}
            <div className="text-gray-600">
              Status: {selectedIncident.responseStatus || "open"}
            </div>
          </div>
        )}

        {incidents.length === 0 && (
          <div className="text-gray-600 mt-2">
            No claimed incidents yet. Go to Incident Feed and click “Take Task”.
          </div>
        )}
      </div>

      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold">Volunteers</div>
          <button className="glass-btn" onClick={load}>
            Refresh
          </button>
        </div>

        {volunteers.length === 0 ? (
          <div className="text-gray-600">No volunteers available.</div>
        ) : (
          <div className="space-y-3">
            {volunteers.map((v) => (
              <div
                key={v._id}
                className="border border-gray-200 rounded-xl p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-gray-900">
                      {v.name || v.email}
                    </div>
                    <div className="text-xs text-gray-600">{v.email}</div>
                    <div className="text-sm text-gray-700 mt-1">
                      {getVolunteerLocation(v)}
                    </div>
                  </div>
                  <button
                    className="glass-btn"
                    disabled={busyVolunteerId === v._id}
                    onClick={() => requestVolunteer(v._id)}
                  >
                    Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
