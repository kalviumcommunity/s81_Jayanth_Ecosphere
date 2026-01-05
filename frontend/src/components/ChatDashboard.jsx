import React, { useState } from "react";
import ChatPage from "./ChatPage";
import UserList from "./UserList";
import VolunteerList from "./VolunteerList";
import useAuth from "../hooks/useAuth"; // This should return user object

const ChatDashboard = () => {
  const { user, loading } = useAuth(); // optional: show loading state
  const [selectedUser, setSelectedUser] = useState(null);

  if (loading) return <div className="p-4">Loading chat...</div>;
  if (!user) return <div className="p-4">Unauthorized</div>;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      {user.role === "volunteer" ? (
        <UserList onSelect={setSelectedUser} onlineUsers={[]} />
      ) : (
        <VolunteerList onSelect={setSelectedUser} onlineUsers={[]} />
      )}

      {/* Chat */}
      {selectedUser ? (
        <ChatPage selectedUser={selectedUser} currentUser={user} />
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Select a conversation to start chatting
        </div>
      )}
    </div>
  );
};

export default ChatDashboard;
