import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function Profile() {
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    avatarUrl: "",
    address: null,
  });

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  useEffect(() => {
    fetch("http://localhost:4567/user/checklogin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setProfilePhoto(data.message.profilePhoto);
        setAddresses(data.message.address);
        setPersonalDetails(data.message);
      });
  }, []);

  const changeProfilePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Please select a file");
      return;
    }
    const multiPartFormData = new FormData();
    multiPartFormData.append("photo", file);
    try {
      const response = await axios.post(
        "http://localhost:4567/user/upload",
        multiPartFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setProfilePhoto(response.data.message.profilePhoto);
        e.target.value = "";
        alert("Profile Photo Updated Successfully");
      }
    } catch (error) {
      console.error("Upload Error:", error);
    }
  };

  const bgMain = darkMode
    ? "bg-neutral-900 text-white"
    : "bg-gray-100 text-gray-900";
  const bgCard = darkMode
    ? "bg-neutral-800 border-neutral-700"
    : "bg-white border-gray-300";
  const textLabel = darkMode ? "text-white" : "text-gray-800";
  const inputStyle = darkMode
    ? "bg-neutral-800 text-white border-neutral-600"
    : "bg-white text-gray-900 border-gray-300";

  return (
    <div className={`min-h-screen w-full ${bgMain} p-6`}>
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <motion.button
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          className="p-2 rounded-full"
          whileTap={{ rotate: 360 }}
        >
          {darkMode ? "🌙" : "☀"}
        </motion.button>
      </header>

      <motion.div
        className={`${bgCard} rounded-xl border shadow-lg p-6 flex flex-col gap-8`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Personal Details Section */}
        <section className="space-y-6">
          <h1 className="text-3xl font-semibold mb-4">Personal Details</h1>
          <div className="flex flex-col sm:flex-row gap-8">
            {/* Profile Image + Upload */}

            <motion.div
              className="flex flex-col items-center gap-4 w-40"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-xl">PICTURE</span>
              <motion.img
                src={
                  profilePhoto
                    ? `http://localhost:4567/profile-photo/${profilePhoto}`
                    : `https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg`
                }
                alt="profile"
                className="w-40 h-40 rounded-full object-cover ring-4 ring-neutral-700 transition-all hover:ring-8"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg`;
                }}
              />
              <label
                htmlFor="upload"
                className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer transition-all"
              >
                Update Photo
              </label>
              <input
                id="upload"
                type="file"
                className="hidden"
                onChange={changeProfilePhoto}
              />
            </motion.div>


            {/* Info */}
            <motion.div
              className="flex flex-col justify-center gap-4 flex-grow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <div className="text-xl font-medium">NAME</div>
                <div className="text-base font-light break-words">
                  {personalDetails.name}
                </div>
              </div>
              <div>
                <div className="text-xl font-medium">EMAIL</div>
                <div className="text-base font-light break-words">
                  {personalDetails.email}
                </div>
              </div>
              <div>
                <div className="text-xl font-medium">MOBILE</div>
                <div className="text-base font-light break-words">
                  {personalDetails.phoneNumber}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Address Section */}
        <motion.section
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold">Address Information</h2>
          <motion.div
            className={`rounded-xl p-4 shadow-md ${bgCard}`}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div>
              {addresses.length > 0 ? (
                addresses.map((address, index) => (
                  <div
                    key={index}
                    className="text-base font-light break-words space-y-1 mt-2"
                  >
                    <p>
                      <strong>Type:</strong> {address.addressType}
                    </p>
                    <p>
                      <strong>Address:</strong> {address.address}
                    </p>
                    <p>
                      <strong>Area:</strong> {address.area}
                    </p>
                    <p>
                      <strong>City:</strong> {address.city}
                    </p>
                    <p>
                      <strong>Pincode:</strong> {address.pincode}
                    </p>
                    <p>
                      <strong>Country:</strong> {address.country}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-base font-light mt-2">
                  No address found.
                </div>
              )}
            </div>
          </motion.div>
        </motion.section>

      </motion.div>
    </div>
  );
}
