import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import {
  FiImage,
  FiMic,
  FiPhone,
  FiSquare,
  FiVideo,
  FiXCircle,
} from "react-icons/fi";
import axios from "axios";

// Use the socket instance passed from parent (ChatPage) to avoid duplicate connections.
const ChatSlide = ({ selectedUser, currentUser, socket, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);

  const fileInputRef = useRef(null);
  const [uploadBusy, setUploadBusy] = useState(false);
  const [uiError, setUiError] = useState("");

  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const [recording, setRecording] = useState(false);

  // Draft media preview (before upload/send)
  const [draftImageFile, setDraftImageFile] = useState(null);
  const [draftImageUrl, setDraftImageUrl] = useState("");
  const [draftAudioFile, setDraftAudioFile] = useState(null);
  const [draftAudioUrl, setDraftAudioUrl] = useState("");

  // Call state
  const peerRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const [callState, setCallState] = useState("idle"); // idle | outgoing | incoming | in-call
  const [callType, setCallType] = useState("audio"); // audio | video
  const [incomingCall, setIncomingCall] = useState(null);

  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return true;
    return window.matchMedia("(min-width: 640px)").matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;
    const media = window.matchMedia("(min-width: 640px)");
    const onChange = (e) => setIsDesktop(Boolean(e.matches));
    try {
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    } catch {
      // Safari fallback
      media.addListener(onChange);
      return () => media.removeListener(onChange);
    }
  }, []);

  // Scroll to bottom on new message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load chat history on user select
  useEffect(() => {
    if (!selectedUser || !currentUser) return;
    const fetchHistory = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4567/chat/history/${selectedUser._id}`,
          { withCredentials: true }
        );
        setMessages(res.data.messages || []);
        scrollToBottom();
      } catch (err) {
        console.error("Failed to load history:", err);
      }
    };

    fetchHistory();
  }, [selectedUser, currentUser]);

  // Cleanup preview object URLs
  useEffect(() => {
    return () => {
      if (draftImageUrl) URL.revokeObjectURL(draftImageUrl);
      if (draftAudioUrl) URL.revokeObjectURL(draftAudioUrl);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Socket setup
  useEffect(() => {
    if (!socket) return;

    // join room for current user (server may expect this)
    if (currentUser?._id) socket.emit("join", currentUser._id);

    const onReceive = (msg) => {
      if (
        (msg.sender === selectedUser?._id &&
          msg.receiver === currentUser?._id) ||
        (msg.sender === currentUser?._id && msg.receiver === selectedUser?._id)
      ) {
        setMessages((prev) => {
          const key = `${msg.sender}|${msg.receiver}|${msg.timestamp || ""}|${
            msg.message
          }`;
          if (
            prev.some(
              (m) =>
                `${m.sender}|${m.receiver}|${m.timestamp || ""}|${
                  m.message
                }` === key
            )
          ) {
            return prev;
          }
          return [...prev, msg];
        });
        scrollToBottom();
      }
    };

    socket.on("receiveMessage", onReceive);
    socket.on("receive-message", onReceive);

    const onIncoming = (payload) => {
      if (!payload) return;
      if (String(payload.from) !== String(selectedUser?._id)) return;
      setIncomingCall(payload);
      setCallType(payload.callType === "video" ? "video" : "audio");
      setCallState("incoming");
    };

    const onCallEnded = (payload) => {
      if (!payload) return;
      if (String(payload.from) !== String(selectedUser?._id)) return;
      endCall(false);
    };

    const onOffer = async ({ from, sdp, callType: ct }) => {
      if (String(from) !== String(selectedUser?._id)) return;
      setCallType(ct === "video" ? "video" : "audio");
      // store offer; accept handler will consume
      setIncomingCall((prev) => ({ ...(prev || {}), from, sdp }));
    };

    const onAnswer = async ({ from, sdp }) => {
      if (String(from) !== String(selectedUser?._id)) return;
      if (!peerRef.current) return;
      try {
        await peerRef.current.setRemoteDescription(
          new RTCSessionDescription(sdp)
        );
        setCallState("in-call");
      } catch (e) {
        setUiError("Failed to set call answer");
      }
    };

    const onIce = async ({ from, candidate }) => {
      if (String(from) !== String(selectedUser?._id)) return;
      if (!peerRef.current) return;
      try {
        await peerRef.current.addIceCandidate(new RTCIceCandidate(candidate));
      } catch {
        // ignore
      }
    };

    socket.on("call:incoming", onIncoming);
    socket.on("call:ended", onCallEnded);
    socket.on("webrtc:offer", onOffer);
    socket.on("webrtc:answer", onAnswer);
    socket.on("webrtc:ice", onIce);

    return () => {
      socket.off("receiveMessage", onReceive);
      socket.off("receive-message", onReceive);
      socket.off("call:incoming", onIncoming);
      socket.off("call:ended", onCallEnded);
      socket.off("webrtc:offer", onOffer);
      socket.off("webrtc:answer", onAnswer);
      socket.off("webrtc:ice", onIce);
    };
  }, [selectedUser, currentUser]);

  const sendMessage = (payload) => {
    if (!socket) return;
    socket.emit("sendMessage", payload);
    setMessages((prev) => [...prev, payload]);
    scrollToBottom();
  };

  const handleSend = () => {
    if (!newMsg.trim()) return;
    setUiError("");
    const messageData = {
      sender: currentUser._id,
      receiver: selectedUser._id,
      messageType: "text",
      message: newMsg.trim(),
      timestamp: new Date().toISOString(),
    };
    sendMessage(messageData);
    setNewMsg("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const clearDraftMedia = () => {
    if (draftImageUrl) URL.revokeObjectURL(draftImageUrl);
    if (draftAudioUrl) URL.revokeObjectURL(draftAudioUrl);
    setDraftImageFile(null);
    setDraftImageUrl("");
    setDraftAudioFile(null);
    setDraftAudioUrl("");
  };

  const uploadFile = async (file) => {
    setUiError("");
    if (!file) return null;
    const form = new FormData();
    form.append("file", file);
    setUploadBusy(true);
    try {
      const res = await axios.post("http://localhost:4567/chat/upload", form, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data?.data || null;
    } catch (e) {
      setUiError(e?.response?.data?.message || "Upload failed");
      return null;
    } finally {
      setUploadBusy(false);
    }
  };

  const handlePickImage = () => {
    setUiError("");
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUiError("");

    // Replace existing draft media
    clearDraftMedia();
    const url = URL.createObjectURL(file);
    setDraftImageFile(file);
    setDraftImageUrl(url);
  };

  const toggleRecording = async () => {
    setUiError("");
    if (recording) {
      try {
        mediaRecorderRef.current?.stop();
      } catch {
        // ignore
      }
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      recordedChunksRef.current = [];
      const mr = new MediaRecorder(stream, { mimeType: "audio/webm" });
      mediaRecorderRef.current = mr;

      mr.ondataavailable = (evt) => {
        if (evt.data && evt.data.size > 0)
          recordedChunksRef.current.push(evt.data);
      };

      mr.onstop = async () => {
        setRecording(false);
        // stop tracks
        stream.getTracks().forEach((t) => t.stop());

        const blob = new Blob(recordedChunksRef.current, {
          type: "audio/webm",
        });
        if (!blob || blob.size === 0) return;
        const file = new File([blob], `voice-${Date.now()}.webm`, {
          type: "audio/webm",
        });

        // Replace existing draft media
        clearDraftMedia();
        const url = URL.createObjectURL(file);
        setDraftAudioFile(file);
        setDraftAudioUrl(url);
      };

      mr.start();
      setRecording(true);
    } catch (e) {
      setUiError("Microphone permission denied");
      setRecording(false);
    }
  };

  const sendDraftMedia = async () => {
    setUiError("");
    if (!draftImageFile && !draftAudioFile) return;

    const file = draftImageFile || draftAudioFile;
    const messageType = draftImageFile ? "image" : "audio";
    const uploaded = await uploadFile(file);
    if (!uploaded?.url) return;

    sendMessage({
      sender: currentUser._id,
      receiver: selectedUser._id,
      messageType,
      message: "",
      mediaUrl: `http://localhost:4567${uploaded.url}`,
      mediaMimeType: uploaded.mimeType,
      mediaOriginalName: uploaded.originalName,
      timestamp: new Date().toISOString(),
    });

    clearDraftMedia();
  };

  const createPeer = () => {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    pc.onicecandidate = (evt) => {
      if (evt.candidate) {
        socket.emit("webrtc:ice", {
          from: currentUser._id,
          to: selectedUser._id,
          candidate: evt.candidate,
        });
      }
    };

    pc.ontrack = (evt) => {
      if (!remoteStreamRef.current) {
        remoteStreamRef.current = new MediaStream();
      }
      remoteStreamRef.current.addTrack(evt.track);
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = remoteStreamRef.current;
      }
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = remoteStreamRef.current;
      }
    };

    peerRef.current = pc;
    return pc;
  };

  const startCall = async (type) => {
    setUiError("");
    setCallType(type);
    setCallState("outgoing");
    setIncomingCall(null);

    socket.emit("call:start", {
      from: currentUser._id,
      to: selectedUser._id,
      callType: type,
    });

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: type === "video",
      });
      localStreamRef.current = stream;

      if (localVideoRef.current && type === "video") {
        localVideoRef.current.srcObject = stream;
      }

      const pc = createPeer();
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit("webrtc:offer", {
        from: currentUser._id,
        to: selectedUser._id,
        sdp: offer,
        callType: type,
      });
    } catch (e) {
      setUiError("Camera/Microphone permission denied");
      endCall(false);
    }
  };

  const acceptCall = async () => {
    if (!incomingCall?.from) return;
    setUiError("");
    setCallState("in-call");
    socket.emit("call:accept", { from: currentUser._id, to: selectedUser._id });

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: callType === "video",
      });
      localStreamRef.current = stream;

      if (localVideoRef.current && callType === "video") {
        localVideoRef.current.srcObject = stream;
      }

      const pc = createPeer();
      stream.getTracks().forEach((track) => pc.addTrack(track, stream));

      if (incomingCall?.sdp) {
        await pc.setRemoteDescription(
          new RTCSessionDescription(incomingCall.sdp)
        );
      }

      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);

      socket.emit("webrtc:answer", {
        from: currentUser._id,
        to: selectedUser._id,
        sdp: answer,
      });
    } catch {
      setUiError("Camera/Microphone permission denied");
      endCall(true);
    }
  };

  const rejectCall = () => {
    socket.emit("call:reject", { from: currentUser._id, to: selectedUser._id });
    setIncomingCall(null);
    setCallState("idle");
  };

  const endCall = (notifyOther) => {
    try {
      if (notifyOther && socket) {
        socket.emit("call:end", {
          from: currentUser._id,
          to: selectedUser._id,
        });
      }
    } catch {
      // ignore
    }

    try {
      peerRef.current?.close();
    } catch {
      // ignore
    }
    peerRef.current = null;

    try {
      localStreamRef.current?.getTracks()?.forEach((t) => t.stop());
    } catch {
      // ignore
    }
    localStreamRef.current = null;
    remoteStreamRef.current = null;

    if (remoteAudioRef.current) remoteAudioRef.current.srcObject = null;
    if (localVideoRef.current) localVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    setIncomingCall(null);
    setCallState("idle");
  };

  return (
    <motion.div
      initial={isDesktop ? { opacity: 0, y: 10 } : { x: "100%" }}
      animate={isDesktop ? { opacity: 1, y: 0 } : { x: 0 }}
      exit={isDesktop ? { opacity: 0, y: 10 } : { x: "100%" }}
      transition={
        isDesktop
          ? { duration: 0.18, ease: "easeOut" }
          : { type: "tween", duration: 0.22, ease: "easeOut" }
      }
      className="fixed top-20 right-4 left-4 bottom-4 z-50 flex flex-col glass-card overflow-hidden sm:static sm:z-auto sm:flex-1 sm:w-full sm:h-full sm:min-h-0"
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-white/20">
        <h2 className="text-lg font-semibold text-gray-900">
          {selectedUser?.name || "Chat"}
        </h2>
        <div className="flex items-center gap-2">
          <button
            className="glass-btn p-2"
            aria-label="Start voice call"
            disabled={callState !== "idle"}
            onClick={() => startCall("audio")}
            title="Voice call"
          >
            <FiPhone />
          </button>
          <button
            className="glass-btn p-2"
            aria-label="Start video call"
            disabled={callState !== "idle"}
            onClick={() => startCall("video")}
            title="Video call"
          >
            <FiVideo />
          </button>
          <button
            onClick={onClose}
            aria-label="Close chat"
            className="text-gray-600 hover:text-gray-800"
          >
            <IoClose size={22} />
          </button>
        </div>
      </div>

      {uiError && (
        <div className="px-4 py-2 text-sm text-red-600 border-b border-white/10">
          {uiError}
        </div>
      )}

      {(callState === "incoming" ||
        callState === "outgoing" ||
        callState === "in-call") && (
        <div className="px-4 py-3 border-b border-white/10">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-gray-700">
              {callState === "incoming" && <>Incoming {callType} call</>}
              {callState === "outgoing" && <>Calling… ({callType})</>}
              {callState === "in-call" && <>In call ({callType})</>}
            </div>

            <div className="flex items-center gap-2">
              {callState === "incoming" && (
                <>
                  <button className="glass-btn" onClick={acceptCall}>
                    Accept
                  </button>
                  <button className="glass-btn" onClick={rejectCall}>
                    Reject
                  </button>
                </>
              )}
              {(callState === "outgoing" || callState === "in-call") && (
                <button
                  className="glass-btn"
                  onClick={() => endCall(true)}
                  title="End call"
                >
                  <FiXCircle />
                </button>
              )}
            </div>
          </div>

          {/* media elements */}
          <audio ref={remoteAudioRef} autoPlay playsInline />
          {callType === "video" && (
            <div className="grid grid-cols-2 gap-3 mt-3">
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full rounded-xl bg-black/10"
              />
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full rounded-xl bg-black/10"
              />
            </div>
          )}
        </div>
      )}

      {/* Chat body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`w-fit max-w-[85%] sm:max-w-[75%] md:max-w-[65%] lg:max-w-[560px] px-4 py-2 rounded-2xl break-words shadow-sm ${
              msg.sender === currentUser._id
                ? "ml-auto bg-indigo-600 text-white"
                : "mr-auto bg-white/70 text-gray-800"
            }`}
          >
            {msg.messageType === "image" && msg.mediaUrl ? (
              <div className="space-y-2">
                <img
                  src={msg.mediaUrl}
                  alt={msg.mediaOriginalName || "image"}
                  className="max-h-64 rounded-xl"
                />
                {msg.mediaOriginalName && (
                  <div className="text-xs opacity-90 truncate">
                    {msg.mediaOriginalName}
                  </div>
                )}
              </div>
            ) : msg.messageType === "audio" && msg.mediaUrl ? (
              <div className="space-y-2">
                <audio
                  controls
                  src={msg.mediaUrl}
                  className="w-[320px] sm:w-[360px] max-w-full"
                />
                {msg.mediaOriginalName && (
                  <div className="text-xs opacity-90 truncate">
                    {msg.mediaOriginalName}
                  </div>
                )}
              </div>
            ) : (
              msg.message
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message input */}
      <div className="p-4 border-t border-white/10">
        {(draftImageUrl || draftAudioUrl) && (
          <div className="mb-3 border border-gray-200 rounded-xl p-3 bg-white/50">
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm font-semibold text-gray-800">Preview</div>
              <div className="flex items-center gap-2">
                <button
                  className="glass-btn"
                  onClick={sendDraftMedia}
                  disabled={uploadBusy || recording}
                >
                  Send
                </button>
                <button
                  className="glass-btn"
                  onClick={clearDraftMedia}
                  disabled={uploadBusy || recording}
                >
                  Cancel
                </button>
              </div>
            </div>

            {draftImageUrl && (
              <div className="mt-3 max-w-[560px]">
                <img
                  src={draftImageUrl}
                  alt={draftImageFile?.name || "preview"}
                  className="max-h-64 rounded-xl max-w-full"
                />
                {draftImageFile?.name && (
                  <div className="text-xs text-gray-600 mt-1 truncate">
                    {draftImageFile.name}
                  </div>
                )}
              </div>
            )}

            {draftAudioUrl && (
              <div className="mt-3 max-w-[560px]">
                <audio
                  controls
                  src={draftAudioUrl}
                  className="w-[320px] sm:w-[360px] max-w-full"
                />
                {draftAudioFile?.name && (
                  <div className="text-xs text-gray-600 mt-1 truncate">
                    {draftAudioFile.name}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-3">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={onFileChange}
            className="hidden"
          />

          <button
            onClick={handlePickImage}
            aria-label="Upload image"
            className="glass-btn p-2 flex items-center justify-center"
            disabled={uploadBusy || recording}
            title="Upload image"
          >
            <FiImage />
          </button>

          <button
            onClick={toggleRecording}
            aria-label={recording ? "Stop recording" : "Record voice message"}
            className="glass-btn p-2 flex items-center justify-center"
            disabled={uploadBusy}
            title={recording ? "Stop recording" : "Record voice"}
          >
            {recording ? <FiSquare /> : <FiMic />}
          </button>

          <input
            type="text"
            value={newMsg}
            onChange={(e) => setNewMsg(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            aria-label="Type your message"
            className="glass-input flex-1"
            disabled={
              uploadBusy || recording || Boolean(draftImageUrl || draftAudioUrl)
            }
          />
          <button
            onClick={handleSend}
            aria-label="Send message"
            className="glass-btn p-2 flex items-center justify-center"
            disabled={
              uploadBusy || recording || Boolean(draftImageUrl || draftAudioUrl)
            }
          >
            <FiSend />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatSlide;
