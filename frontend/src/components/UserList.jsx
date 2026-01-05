import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const UserList = ({ onSelect, onlineUsers }) => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4567/chat/users", {
          withCredentials: true,
        });
        if (res.data?.data) {
          setUsers(res.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };

    if (user?.role === "volunteer") {
      fetchUsers();
    }
  }, [user]);

  return (
    <div className="w-full sm:w-80 md:w-96 shrink-0 p-4 h-full overflow-y-auto glass-card">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No conversations yet.</p>
      ) : (
        users.map((u) => (
          <div
            key={u._id}
            onClick={() => onSelect(u)}
            className="flex justify-between items-center p-2 cursor-pointer rounded-md transition hover:bg-indigo-50/30"
          >
            <span className="font-medium">{u.name}</span>
            <span
              className={`h-3 w-3 rounded-full ${
                onlineUsers?.includes(u._id) ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
          </div>
        ))
      )}
    </div>
  );
};

export default UserList;
