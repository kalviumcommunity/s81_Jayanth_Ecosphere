import React, { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import useAuth from "../hooks/useAuth";
import { buildBackendUrl } from "../utils/apiConfig";

const Volenteer = () => {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [tasks, setTasks] = useState([]);
  const [taskError, setTaskError] = useState("");
  const [taskBusyId, setTaskBusyId] = useState(null);

  const [incidentTasks, setIncidentTasks] = useState([]);
  const [incidentError, setIncidentError] = useState("");
  const [incidentBusyId, setIncidentBusyId] = useState(null);

  const [incidentRequests, setIncidentRequests] = useState([]);
  const [requestError, setRequestError] = useState("");
  const [requestBusyId, setRequestBusyId] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(buildBackendUrl("/volen/volunteer"), {
        withCredentials: true,
      });
      if (response.status === 200) {
        setData(response.data);
      }
    } catch (error) {
      console.log("Error fetching user:", error);
      setError("Failed to load user information.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const loadMyTasks = async () => {
    setTaskError("");
    try {
      const res = await axios.get(buildBackendUrl("/assist/pending"), {
        withCredentials: true,
      });
      const all = res.data?.data || [];
      const myId = user?._id;
      const mine = all.filter(
        (t) =>
          t.status === "accepted" && String(t.assignedToId) === String(myId)
      );
      setTasks(mine);
    } catch (e) {
      setTaskError(e?.response?.data?.message || "Failed to load tasks");
      setTasks([]);
    }
  };

  const markTask = async (id, status) => {
    setTaskBusyId(id);
    try {
      await axios.patch(
        buildBackendUrl(`/assist/requests/${id}/status`),
        { status },
        { withCredentials: true }
      );
      await loadMyTasks();
      await fetchUser();
    } catch (e) {
      setTaskError(e?.response?.data?.message || "Failed to update task");
    } finally {
      setTaskBusyId(null);
    }
  };

  const loadMyIncidentTasks = async () => {
    setIncidentError("");
    try {
      const res = await axios.get(buildBackendUrl("/incidents/volunteer/my"), {
        withCredentials: true,
      });
      setIncidentTasks(res.data?.data || []);
    } catch (e) {
      setIncidentError(
        e?.response?.data?.message || "Failed to load incident tasks"
      );
      setIncidentTasks([]);
    }
  };

  const loadIncidentRequests = async () => {
    setRequestError("");
    try {
      const res = await axios.get(
        buildBackendUrl("/incidents/volunteer/requests"),
        { withCredentials: true }
      );
      setIncidentRequests(res.data?.data || []);
    } catch (e) {
      setRequestError(
        e?.response?.data?.message || "Failed to load incident requests"
      );
      setIncidentRequests([]);
    }
  };

  const respondToRequest = async (incidentId, action) => {
    setRequestBusyId(incidentId);
    setRequestError("");
    try {
      await axios.patch(
        buildBackendUrl(`/incidents/${incidentId}/volunteer/request`),
        { action },
        { withCredentials: true }
      );
      await loadIncidentRequests();
      await loadMyIncidentTasks();
      await fetchUser();
    } catch (e) {
      setRequestError(e?.response?.data?.message || "Failed to update request");
    } finally {
      setRequestBusyId(null);
    }
  };

  const resolveIncident = async (id) => {
    setIncidentBusyId(id);
    try {
      await axios.patch(
        buildBackendUrl(`/incidents/${id}/volunteer/status`),
        { responseStatus: "resolved" },
        { withCredentials: true }
      );
      await loadMyIncidentTasks();
      await fetchUser();
    } catch (e) {
      setIncidentError(
        e?.response?.data?.message || "Failed to resolve incident"
      );
    } finally {
      setIncidentBusyId(null);
    }
  };

  useEffect(() => {
    if (user?.role === "volunteer") {
      loadMyTasks();
      loadMyIncidentTasks();
      loadIncidentRequests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, user?.role]);

  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto my-12 p-6 glass-card">
        <div className="text-center">Loading…</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto my-12 p-6 glass-card">
        <div className="text-center">Unauthorized</div>
      </div>
    );
  }

  if (user.role !== "volunteer") {
    return (
      <div className="max-w-4xl mx-auto my-12 p-6 glass-card">
        <div className="text-center">Forbidden</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-12 p-6 glass-card">
      <h1 className="text-center text-2xl sm:text-3xl font-semibold text-gray-900">
        Welcome Volunteer
      </h1>

      <div className="text-center my-6">
        {loading ? (
          <ClipLoader size={34} color="#6C7CFA" />
        ) : error ? (
          <>
            <p className="text-red-600">{error}</p>
            <button onClick={fetchUser} className="glass-btn mt-3">
              Retry
            </button>
          </>
        ) : (
          <>
            <p className="text-lg text-gray-700">{data.message}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Tasks Card */}
              <div className="p-4 glass-card">
                <h3 className="font-semibold mb-1">My Active Tasks</h3>
                <p className="text-xs text-gray-500 mb-3">
                  Tasks you have taken from “Pending Assistance”.
                </p>

                {taskError && (
                  <div className="text-red-600 text-sm mb-2">{taskError}</div>
                )}

                {tasks.length > 0 ? (
                  <div className="space-y-3">
                    {tasks.map((t) => (
                      <div
                        key={t._id}
                        className="border border-gray-200 rounded-xl p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-semibold text-gray-900">
                              {t.title}
                            </div>
                            <div className="text-sm text-gray-700 mt-1">
                              {t.description}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {t.category}
                              {t.location?.city ? ` • ${t.location.city}` : ""}
                            </div>
                          </div>
                          <div className="text-xs text-gray-600">
                            {t.status}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <button
                            className="glass-btn"
                            disabled={taskBusyId === t._id}
                            onClick={() => markTask(t._id, "completed")}
                          >
                            Complete
                          </button>
                          <button
                            className="glass-btn"
                            disabled={taskBusyId === t._id}
                            onClick={() => markTask(t._id, "rejected")}
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-600">
                    No tasks assigned yet. Go to “Pending Assistance” and click
                    “Take Task”.
                  </div>
                )}

                <div className="mt-4">
                  <button
                    className="glass-btn"
                    onClick={() =>
                      (window.location.href = "/assistance/pending")
                    }
                  >
                    View Pending Assistance
                  </button>
                </div>

                {Array.isArray(data?.tasks) && data.tasks.length > 0 && (
                  <div className="mt-5 border-t border-gray-200 pt-4">
                    <h4 className="font-semibold mb-2">Completed Tasks</h4>
                    <div className="space-y-2">
                      {data.tasks
                        .filter((t) => t?.completed)
                        .slice(0, 10)
                        .map((t, idx) => (
                          <div
                            key={`${t.title}-${idx}`}
                            className="flex items-center justify-between text-sm text-gray-700"
                          >
                            <span className="truncate">{t.title}</span>
                            <span className="text-xs text-green-700">
                              Completed
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Incident Tasks */}
              <div className="p-4 glass-card">
                <h3 className="font-semibold mb-1">Assigned Incident Tasks</h3>
                <p className="text-xs text-gray-500 mb-3">
                  Incidents assigned to you by an NGO.
                </p>

                <div className="mb-4 border-b border-gray-200 pb-3">
                  <h4 className="font-semibold mb-1">Pending Requests</h4>
                  <p className="text-xs text-gray-500 mb-3">
                    Accept or reject incident requests from NGOs.
                  </p>

                  {requestError && (
                    <div className="text-red-600 text-sm mb-2">
                      {requestError}
                    </div>
                  )}

                  {incidentRequests.length > 0 ? (
                    <div className="space-y-3">
                      {incidentRequests.map((r) => (
                        <div
                          key={r._id}
                          className="border border-gray-200 rounded-xl p-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="font-semibold text-gray-900">
                                {r.title}
                              </div>
                              <div className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">
                                {r.description}
                              </div>
                              {r.locationText && (
                                <div className="text-xs text-gray-500 mt-1">
                                  {r.locationText}
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-gray-600">
                              requested
                            </div>
                          </div>

                          <div className="flex gap-2 mt-3">
                            <button
                              className="glass-btn"
                              disabled={requestBusyId === r._id}
                              onClick={() => respondToRequest(r._id, "accept")}
                            >
                              Accept
                            </button>
                            <button
                              className="glass-btn"
                              disabled={requestBusyId === r._id}
                              onClick={() => respondToRequest(r._id, "reject")}
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-600">No pending requests.</div>
                  )}
                </div>

                {incidentError && (
                  <div className="text-red-600 text-sm mb-2">
                    {incidentError}
                  </div>
                )}

                {incidentTasks.length > 0 ? (
                  <div className="space-y-3">
                    {incidentTasks.map((it) => (
                      <div
                        key={it._id}
                        className="border border-gray-200 rounded-xl p-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="font-semibold text-gray-900">
                              {it.title}
                            </div>
                            <div className="text-sm text-gray-700 mt-1 whitespace-pre-wrap">
                              {it.description}
                            </div>
                            {it.locationText && (
                              <div className="text-xs text-gray-500 mt-1">
                                {it.locationText}
                              </div>
                            )}
                          </div>
                          <div className="text-xs text-gray-600">
                            {it.responseStatus || "assigned"}
                          </div>
                        </div>

                        <div className="flex gap-2 mt-3">
                          <button
                            className="glass-btn"
                            disabled={
                              incidentBusyId === it._id ||
                              it.responseStatus === "resolved"
                            }
                            onClick={() => resolveIncident(it._id)}
                          >
                            {it.responseStatus === "resolved"
                              ? "Resolved"
                              : "Mark Resolved"}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-600">
                    No incident tasks assigned yet.
                  </div>
                )}
              </div>

              {/* Assigned Events */}
              <div className="p-4 glass-card">
                <h3 className="font-semibold mb-2">Assigned Events</h3>
                {data.assignedEvents.length > 0 ? (
                  <ul className="list-disc list-inside text-gray-700">
                    {data.assignedEvents.map((event, index) => (
                      <li key={index}>{event}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600">No events assigned.</p>
                )}
              </div>

              {/* Hours Logged */}
              <div className="p-4 glass-card">
                <h3 className="font-semibold mb-2">Hours Logged</h3>
                <p className="text-gray-700">{data.hoursLogged} hours</p>
              </div>

              {/* Profile Info */}
              <div className="p-4 glass-card">
                <h3 className="font-semibold mb-2">Profile Info</h3>
                <p className="text-gray-700">
                  <strong>Email:</strong> {data?.email || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Age:</strong> {data?.profile?.age || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {data?.profile?.phone || "N/A"}
                </p>
                <p className="text-gray-700">
                  <strong>Address:</strong> {data?.profile?.address || "N/A"}
                </p>
              </div>

              {/* Achievements */}
              <div className="p-4 glass-card md:col-span-2">
                <h3 className="font-semibold mb-2">
                  Achievements
                  <span className="text-sm text-gray-500 font-normal">
                    {" "}
                    (
                    {Array.isArray(data?.achievements)
                      ? data.achievements.length
                      : 0}
                    )
                  </span>
                </h3>
                {Array.isArray(data?.achievements) &&
                data.achievements.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {data.achievements.map((achievement, index) => (
                      <span
                        key={`${achievement}-${index}`}
                        title={achievement}
                        aria-label={achievement}
                        className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-sm text-gray-700"
                      >
                        Badge {index + 1}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No achievements yet.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Volenteer;
