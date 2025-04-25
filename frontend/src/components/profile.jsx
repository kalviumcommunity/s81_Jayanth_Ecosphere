import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [personalDetails, setPersonalDetails] = useState({
    name: "",
    email: "",
    phone: "",
    avatarUrl: "",
  });

  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:4567/volen/volunteer", {
      withCredentials: true
    })
    .then((res) => {
      const { name, email, profile, profilePhoto } = res.data;
      setPersonalDetails({
        name,
        email,
        phone: profile?.phone || "",
        avatarUrl: profilePhoto || ""
      });
      setProfilePhoto(profilePhoto);
    })
    .catch((err) => {
      console.error("Failed to fetch profile:", err);
    });
  }, []);

  const changeProfilePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return alert("Please select a file");

    const formData = new FormData();
    formData.append("photo", file);

    try {
      const response = await axios.post(
        "http://localhost:4567/volen/upload", 
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      );
      setProfilePhoto(response.data.message.profilePhoto);
      alert("Profile photo updated");
    } catch (error) {
      console.error("Photo upload failed:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-neutral-900 p-6">
      <div className="bg-neutral-800 rounded-xl border border-neutral-700 shadow-lg p-6 flex flex-col gap-8">

        
        <section>
          <h1 className="text-3xl font-semibold text-white mb-4">Personal Details</h1>
          <div className="flex flex-col sm:flex-row gap-8">
            
            
            <div className="flex flex-col items-center gap-4 w-40">
              <span className="text-xl text-white">PICTURE</span>
              <img
                src={
                  profilePhoto
                    ? `http://localhost:4567/profile-photo/${profilePhoto}`
                    : `https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg`
                }
                alt="profile"
                className="w-40 h-40 rounded-full object-cover ring-4 ring-neutral-700"
              />
              <label htmlFor="upload" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer transition-all">
                Update Photo
              </label>
              <input id="upload" type="file" className="hidden" onChange={changeProfilePhoto} />
            </div>

            
            <div className="flex flex-col justify-center gap-4 text-white flex-grow">
              <div>
                <div className="text-xl font-medium">NAME</div>
                <div className="text-base font-light">{personalDetails.name}</div>
              </div>
              <div>
                <div className="text-xl font-medium">EMAIL</div>
                <div className="text-base font-light">{personalDetails.email}</div>
              </div>
              <div>
                <div className="text-xl font-medium">PHONE</div>
                <div className="text-base font-light">{personalDetails.phone}</div>
              </div>
            </div>

          </div>
        </section>
      </div>
    </div>
  );
}
