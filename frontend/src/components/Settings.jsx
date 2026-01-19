import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { buildBackendUrl } from "../utils/apiConfig";

const Settings = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [success, setSuccess] = useState("");

  // password change
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  // profile photo
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState("");

  // account delete
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await axios.get(buildBackendUrl("/user/profile"), {
          withCredentials: true,
        });
        if (!mounted) return;
        setEmail(res.data?.message?.email || "");
        setPhotoPreview(
          res.data?.message?.profilePhoto
            ? buildBackendUrl(`/profile-photo/${res.data.message.profilePhoto}`)
            : ""
        );
      } catch (err) {
        // ignore silently
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => (mounted = false);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSuccess("");
    try {
      await axios.post(
        buildBackendUrl("/user/settings"),
        { email, notifications },
        { withCredentials: true }
      );
      setSuccess("Settings saved.");
    } catch (err) {
      setSuccess("Failed to save settings.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMsg("");
    if (!currentPassword || !newPassword) {
      setPasswordMsg("Please fill both fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg("New passwords do not match");
      return;
    }
    setPasswordLoading(true);
    try {
      await axios.post(
        buildBackendUrl("/user/change-password"),
        { currentPassword, newPassword },
        { withCredentials: true }
      );
      setPasswordMsg("Password updated.");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setPasswordMsg(
        err.response?.data?.message || "Failed to update password."
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const handlePhotoSelect = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setPhotoFile(f);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(f);
  };

  const handleUploadPhoto = async () => {
    if (!photoFile) return setUploadMsg("Select a photo first");
    setUploadLoading(true);
    setUploadMsg("");
    const form = new FormData();
    form.append("photo", photoFile);
    try {
      const res = await axios.post(buildBackendUrl("/user/upload"), form, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });
      setUploadMsg("Photo uploaded.");
      setPhotoFile(null);
      // set returned preview if available
      if (res.data?.message?.profilePhoto) {
        setPhotoPreview(
          buildBackendUrl(`/profile-photo/${res.data.message.profilePhoto}`)
        );
      }
    } catch (err) {
      setUploadMsg("Upload failed.");
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deleteConfirm) return setDeleteMsg("Please confirm deletion first.");
    setDeleteLoading(true);
    setDeleteMsg("");
    try {
      await axios.post(
        buildBackendUrl("/user/delete"),
        {},
        { withCredentials: true }
      );
      // clear local state and redirect to login
      localStorage.removeItem("token");
      navigate("/Login");
    } catch (err) {
      setDeleteMsg("Failed to delete account.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="page-wrap flex items-start justify-center min-h-screen">
      <motion.div className="w-full max-w-2xl space-y-6">
        {/* Main settings card */}
        <motion.form
          onSubmit={handleSave}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>

          {loading ? (
            <div className="text-gray-600">Loading…</div>
          ) : (
            <>
              <label className="block mb-3">
                <div className="text-sm font-medium mb-1">Email</div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input w-full"
                />
              </label>

              <label className="flex items-center space-x-3 mb-4">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="form-checkbox rounded"
                />
                <span>Enable email notifications</span>
              </label>

              <div className="flex items-center gap-3">
                <button className="glass-btn" type="submit">
                  Save Settings
                </button>
                <span className="text-sm text-green-600">{success}</span>
              </div>
            </>
          )}
        </motion.form>

        {/* Password change card */}
        <motion.form
          onSubmit={handlePasswordChange}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-semibold mb-3">Change Password</h3>
          <input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="glass-input w-full mb-3"
          />
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="glass-input w-full mb-3"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="glass-input w-full mb-3"
          />
          <div className="flex items-center gap-3">
            <button
              className="glass-btn"
              type="submit"
              disabled={passwordLoading}
            >
              {passwordLoading ? "Updating…" : "Update Password"}
            </button>
            <span className="text-sm text-red-600">{passwordMsg}</span>
          </div>
        </motion.form>

        {/* Photo upload card */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-3">Profile Photo</h3>
          <div className="flex items-center gap-4">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-sm text-gray-500">No photo</div>
              )}
            </div>

            <div className="flex-1">
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoSelect}
              />
              <div className="mt-3 flex items-center gap-3">
                <button
                  className="glass-btn"
                  onClick={handleUploadPhoto}
                  disabled={uploadLoading}
                >
                  {uploadLoading ? "Uploading…" : "Upload Photo"}
                </button>
                <span className="text-sm text-green-600">{uploadMsg}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Account deletion card */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-3 text-red-600">
            Danger Zone
          </h3>
          <p className="text-sm text-gray-700 mb-3">
            Deleting your account is irreversible. All your data will be
            removed.
          </p>
          <label className="flex items-center space-x-3 mb-3">
            <input
              type="checkbox"
              checked={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.checked)}
              className="form-checkbox rounded"
            />
            <span>Yes, I want to delete my account</span>
          </label>
          <div className="flex items-center gap-3">
            <button
              className="glass-btn bg-red-600 text-white hover:opacity-90"
              onClick={handleDeleteAccount}
              disabled={deleteLoading}
            >
              {deleteLoading ? "Deleting…" : "Delete Account"}
            </button>
            <span className="text-sm text-red-600">{deleteMsg}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;
