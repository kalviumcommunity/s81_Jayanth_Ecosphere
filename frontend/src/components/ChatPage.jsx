import React, { useEffect, useState } from "react";
import axios from "axios";
import ChatSlide from "./ChatSlide";
import VolunteerList from "./VolunteerList";
import UserList from "./UserList";
import socket from "../store/socket";
import { buildBackendUrl } from "../utils/apiConfig";

const ChatPage = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(buildBackendUrl("/user/checklogin"), {
          withCredentials: true,
        });

        if (res.data?.message) {
          setCurrentUser(res.data.message);
        }
      } catch (err) {
        console.error("Error checking login:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (!currentUser?._id) return;

    if (!socket.connected) socket.connect();

    const onConnect = () => {
      socket.emit("register", currentUser._id);
    };

    const onOnlineUsers = (users) => {
      setOnlineUsers(Array.isArray(users) ? users : []);
    };

    socket.on("connect", onConnect);
    socket.on("online-users", onOnlineUsers);

    if (socket.connected) onConnect();

    return () => {
      socket.off("connect", onConnect);
      socket.off("online-users", onOnlineUsers);
      socket.disconnect();
    };
  }, [currentUser?._id]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const handleCloseChat = () => {
    setSelectedUser(null);
  };

  if (loading) return <div className="p-4">Loading chat...</div>;
  if (!currentUser) return <div className="p-4">Unauthorized</div>;

  return (
    <div className="flex h-[calc(100vh-80px)]">
      {currentUser.role === "volunteer" ? (
        <UserList onSelect={handleSelectUser} onlineUsers={onlineUsers} />
      ) : (
        <VolunteerList onSelect={handleSelectUser} onlineUsers={onlineUsers} />
      )}

      {selectedUser && currentUser ? (
        <ChatSlide
          selectedUser={selectedUser}
          currentUser={currentUser}
          socket={socket}
          onClose={handleCloseChat}
        />
      ) : (
        <div className="hidden sm:flex flex-1 h-full glass-card items-center justify-center text-gray-500">
          Select a conversation to start chatting
        </div>
      )}
    </div>
  );
};

export default ChatPage;
