import React, { useEffect, useState } from "react";
import axios from "axios";
import { buildBackendUrl } from "../utils/apiConfig";

const VolunteerList = ({ onSelect, onlineUsers }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(buildBackendUrl("/chat/all"), { withCredentials: true })
      .then((res) => {
        setVolunteers(res.data.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch volunteers:", err);
        setError("Failed to load volunteers");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading volunteers...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="w-full sm:w-80 md:w-96 shrink-0 p-4 h-full overflow-y-auto glass-card">
      <h2 className="text-xl font-bold mb-4">Volunteers</h2>
      {volunteers.length === 0 ? (
        <p className="text-gray-500">No volunteers found.</p>
      ) : (
        volunteers.map((v) => (
          <div
            key={v._id}
            onClick={() => onSelect(v)}
            className="flex justify-between items-center p-2 cursor-pointer rounded-md transition hover:bg-indigo-50/30"
          >
            <span className="font-medium">{v.name}</span>
            <span
              className={`h-3 w-3 rounded-full ${
                onlineUsers.includes(v._id) ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
          </div>
        ))
      )}
    </div>
  );
};

export default VolunteerList;
