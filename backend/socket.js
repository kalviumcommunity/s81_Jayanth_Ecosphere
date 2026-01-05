const { Server } = require("socket.io");
const { chatModel } = require("./Model/chatSchema");

const userSocketMap = {}; // userId -> socketId

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  const broadcastOnlineUsers = () => {
    io.emit("online-users", Object.keys(userSocketMap));
  };

  const registerUser = (socket, userId) => {
    if (!userId) return;
    userSocketMap[String(userId)] = socket.id;
    broadcastOnlineUsers();
  };

  io.on("connection", (socket) => {
    console.log("🟢 Socket connected:", socket.id);

    // Support both legacy and current client event names
    socket.on("register", (userId) => registerUser(socket, userId));
    socket.on("join", (userId) => registerUser(socket, userId));

    const handleSendMessage = ({
      sender,
      receiver,
      message,
      messageType,
      mediaUrl,
      mediaMimeType,
      mediaOriginalName,
      fromUserId,
      toUserId,
      timestamp,
    }) => {
      const from = String(sender || fromUserId || "");
      const to = String(receiver || toUserId || "");
      const normalizedType = ["text", "image", "audio"].includes(messageType)
        ? messageType
        : "text";

      const text = (message || "").toString();
      const url = (mediaUrl || "").toString();

      if (!from || !to) return;
      if (normalizedType === "text" && !text.trim()) return;
      if (normalizedType !== "text" && !url.trim()) return;

      const payload = {
        sender: from,
        receiver: to,
        message: text,
        messageType: normalizedType,
        mediaUrl: url || undefined,
        mediaMimeType: mediaMimeType || undefined,
        mediaOriginalName: mediaOriginalName || undefined,
        timestamp: timestamp || new Date().toISOString(),
      };

      // Persist asynchronously so delivery feels instant
      chatModel
        .create({
          sender: from,
          receiver: to,
          message: text,
          messageType: normalizedType,
          mediaUrl: url || undefined,
          mediaMimeType: mediaMimeType || undefined,
          mediaOriginalName: mediaOriginalName || undefined,
          timestamp: payload.timestamp,
        })
        .catch((err) => {
          console.error("❌ Failed to save message:", err.message);
        });

      const targetSocket = userSocketMap[to];
      if (targetSocket) {
        io.to(targetSocket).emit("receiveMessage", payload);
        io.to(targetSocket).emit("receive-message", payload);
      }
      // Optionally echo back to sender (helps multi-tab)
      const senderSocket = userSocketMap[from];
      if (senderSocket) {
        io.to(senderSocket).emit("receiveMessage", payload);
        io.to(senderSocket).emit("receive-message", payload);
      }
    };

    socket.on("sendMessage", handleSendMessage);
    socket.on("send-message", handleSendMessage);

    const forwardToUser = (toUserId, event, payload) => {
      const targetSocket = userSocketMap[String(toUserId)];
      if (!targetSocket) return false;
      io.to(targetSocket).emit(event, payload);
      return true;
    };

    // Calls + WebRTC signaling (1:1)
    socket.on("call:start", ({ from, to, callType }) => {
      if (!from || !to) return;
      forwardToUser(to, "call:incoming", {
        from,
        to,
        callType: callType || "audio",
      });
    });

    socket.on("call:accept", ({ from, to }) => {
      if (!from || !to) return;
      forwardToUser(to, "call:accepted", { from, to });
    });

    socket.on("call:reject", ({ from, to, reason }) => {
      if (!from || !to) return;
      forwardToUser(to, "call:rejected", {
        from,
        to,
        reason: reason || "rejected",
      });
    });

    socket.on("call:end", ({ from, to }) => {
      if (!from || !to) return;
      forwardToUser(to, "call:ended", { from, to });
    });

    socket.on("webrtc:offer", ({ from, to, sdp, callType }) => {
      if (!from || !to || !sdp) return;
      forwardToUser(to, "webrtc:offer", {
        from,
        to,
        sdp,
        callType: callType || "audio",
      });
    });

    socket.on("webrtc:answer", ({ from, to, sdp }) => {
      if (!from || !to || !sdp) return;
      forwardToUser(to, "webrtc:answer", { from, to, sdp });
    });

    socket.on("webrtc:ice", ({ from, to, candidate }) => {
      if (!from || !to || !candidate) return;
      forwardToUser(to, "webrtc:ice", { from, to, candidate });
    });

    socket.on("disconnect", () => {
      for (let userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
          delete userSocketMap[userId];
          break;
        }
      }
      broadcastOnlineUsers();
      console.log("🔴 Socket disconnected:", socket.id);
    });
  });
}

module.exports = { setupSocket };
