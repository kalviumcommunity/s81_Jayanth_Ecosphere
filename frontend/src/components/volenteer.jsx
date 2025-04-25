import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";

const Volenteer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:4567/volen/volunteer", {
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

  const cardStyle = {
    padding: '15px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    marginBottom: '20px',
  };

  return (
    <div style={{
      maxWidth: '900px',
      margin: '40px auto',
      padding: '20px',
      backgroundColor: '#f4f7fb',
      borderRadius: '12px',
    }}>
      <h1 style={{ textAlign: 'center', color: '#2c3e50' }}>Welcome Volunteer</h1>

      <div style={{ textAlign: 'center', margin: '20px 0' }}>
        {loading ? (
          <ClipLoader size={30} color="#36d7b7" />
        ) : error ? (
          <>
            <p style={{ color: "red" }}>{error}</p>
            <button onClick={fetchUser} style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#36d7b7',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}>
              Retry
            </button>
          </>
        ) : (
          <>
            <p style={{ fontSize: '1.1em' }}>{data.message}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {/* Tasks Card */}
              <div style={cardStyle}>
                <h3>Tasks</h3>
                {data.tasks.length > 0 ? (
                  <ul>
                    {data.tasks.map((task, index) => (
                      <li key={index}>{task}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No tasks assigned yet.</p>
                )}
              </div>

              {/* Assigned Events */}
              <div style={cardStyle}>
                <h3>Assigned Events</h3>
                {data.assignedEvents.length > 0 ? (
                  <ul>
                    {data.assignedEvents.map((event, index) => (
                      <li key={index}>{event}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No events assigned.</p>
                )}
              </div>

              {/* Hours Logged */}
              <div style={cardStyle}>
                <h3>Hours Logged</h3>
                <p>{data.hoursLogged} hours</p>
              </div>

              {/* Profile Info */}
              <div style={cardStyle}>
                <h3>Profile Info</h3>
                <p><strong>Email:</strong> {data?.email || 'N/A'}</p>
                <p><strong>Age:</strong> {data?.profile?.age || 'N/A'}</p>
                <p><strong>Phone:</strong> {data?.profile?.phone || 'N/A'}</p>
                <p><strong>Address:</strong> {data?.profile?.address || 'N/A'}</p>
              </div>

              {/* Achievements */}
              <div style={{ ...cardStyle, gridColumn: '1 / -1' }}>
                <h3>Achievements</h3>
                {data.achievements.length > 0 ? (
                  <ul>
                    {data.achievements.map((achievement, index) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No achievements yet.</p>
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
