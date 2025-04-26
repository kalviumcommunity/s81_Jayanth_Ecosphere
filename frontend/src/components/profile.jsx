import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
	const [personalDetails, setPersonalDetails] = useState({
		name: "",
		email: "",
		phoneNumber: "",
		avatarUrl: "",
	});

	const [profilePhoto, setProfilePhoto] = useState(null);

	useEffect(() => {
		fetch("http://localhost:4567/user/checklogin", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include"
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				return res.json();
			})
			.then((data) => {
				setProfilePhoto(data.message.profilePhoto);
				setPersonalDetails(data.message);
				console.log("User fetched:", data.message);
        console.log("Profile photo:", data.message.profilePhoto)
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
					withCredentials: true
				}
			);
			if (response.status === 200) {
				setProfilePhoto(response.data.message.profilePhoto);
        console.log(response.data.message.profilePhoto)
				e.target.value = "";
				alert("Profile Photo Updated Successfully");
			}
		} catch (error) {
			console.error("Upload Error:", error);
		}
	};

	return (
		<div className="min-h-screen w-full bg-neutral-900 p-6">
			<div className="bg-neutral-800 rounded-xl border border-neutral-700 shadow-lg p-6 flex flex-col gap-8">

				{/* Personal Details Section */}
				<section>
					<h1 className="text-3xl font-semibold text-white mb-4">Personal Details</h1>
					<div className="flex flex-col sm:flex-row gap-8">

						{/* Profile Image + Upload */}
						<div className="flex flex-col items-center gap-4 w-40">
							<span className="text-xl text-white">PICTURE</span>
							<img
								src={profilePhoto ? `http://localhost:4567/profile-photo/${profilePhoto}` : `https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg`}
								alt="profile"
								className="w-40 h-40 rounded-full object-cover ring-4 ring-neutral-700"
								onError={(e) => {
									e.target.onerror = null;
									e.target.src = `https://cdn.vectorstock.com/i/500p/17/61/male-avatar-profile-picture-vector-10211761.jpg`;
								}}
							/>
							<label htmlFor="upload" className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer transition-all">
								Update Photo
							</label>
							<input id="upload" type="file" className="hidden" onChange={changeProfilePhoto} />
						</div>

						{/* Info */}
						<div className="flex flex-col justify-center gap-4 text-white flex-grow">
							<div>
								<div className="text-xl font-medium">NAME</div>
								<div className="text-base font-light break-words">{personalDetails.name}</div>
							</div>
							<div>
								<div className="text-xl font-medium">EMAIL</div>
								<div className="text-base font-light break-words">{personalDetails.email}</div>
							</div>
							<div>
								<div className="text-xl font-medium">MOBILE</div>
								<div className="text-base font-light break-words">{personalDetails.phoneNumber}</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}
