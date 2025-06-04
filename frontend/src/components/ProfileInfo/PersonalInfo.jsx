import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import FloatingInput from "./FloatingInput"; // adjust path if needed
import { useTheme } from "../../context/ThemeContext";
const UserCardForm = () => {
  const {theme}=useTheme();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setProfilePhoto(base64);
        localStorage.setItem("profilePhoto", base64); // ✅ Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("userData"));

    if (savedData) {
      setProfilePhoto(savedData.profilePhoto || null);
      setName(savedData.name || "");
      setDob(savedData.dob || "");
      setGender(savedData.gender || "");
      setEmail(savedData.email || "");
      setLinkedIn(savedData.linkedIn || "");
      setResumeUrl(savedData.resumeUrl || "");
      setPhone(savedData.phone || "");
      setLocation(savedData.location || "");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      alert("Invalid email format");
      return;
    }
    if (!linkedIn.startsWith("https://linkedin.com")) {
      alert("LinkedIn URL must start with https://linkedin.com/");
      return;
    }
    if (!/^https?:\/\//.test(resumeUrl)) {
      alert("Resume URL must start with http:// or https://");
      return;
    }
    if (!/^\+?\d{10,15}$/.test(phone)) {
      alert(
        "Phone number must be valid with country code (e.g. +919876543210)"
      );
      return;
    }

    const userData = {
      profilePhoto,
      name,
      dob,
      gender,
      email,
      linkedIn,
      resumeUrl,
      phone,
      location,
    };

    localStorage.setItem("userData", JSON.stringify(userData)); // ✅ Save everything
    alert("Saved successfully!");
  };

  return (
<div className="relative max-w-3xl mx-auto mt-6">
  <form
    onSubmit={handleSubmit}
    className="border-2 rounded-2xl p-6 pt-10 font-semibold"
  >
    <span className={`absolute -top-4 left-6   ${theme=="light"?"bg-purple-100":"bg-base-100"} px-2 text-lg font-semibold `}>
      Personal Info
    </span>
      <div className="flex flex-col items-center mb-4">
        {/* Uploadable Profile Photo */}
        <label htmlFor="photo-upload" className="cursor-pointer relative group">
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Profile"
              className="w-20 h-20 object-cover rounded-full border-2"
            />
          ) : (
            <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 bg-base-200 text-base-content">
              <FaUser className="text-5xl" />
            </div>
          )}
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {/* Gender */}
        <div className="flex gap-2 items-center justify-center mt-4">
          {["Male", "Female", "Other"].map((g) => (
            <label key={g} className="cursor-pointer">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={gender === g}
                onChange={(e) => setGender(e.target.value)}
                className="hidden"
              />
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm transition ${
                  gender === g
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 text-base-content"
                }`}
              >
                {g}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Form Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FloatingInput
          label="Full Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <FloatingInput
          label="Date Of Birth"
          type="date"
          value={dob}
          onChange={(e) => setName(e.target.value)}
        />
        <FloatingInput
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setName(e.target.value)}
        />

        <FloatingInput
          label="LinkedIn Profile URL"
          type="url"
          value={linkedIn}
          onChange={(e) => setName(e.target.value)}
        />

        <FloatingInput
          label="Resume URL"
          type="url"
          value={resumeUrl}
          onChange={(e) => setName(e.target.value)}
        />

        <FloatingInput
          label="Phone Number (with country code)"
          type="tel"
          value={phone}
          onChange={(e) => setName(e.target.value)}
        />

        <FloatingInput
          label="Location (City, State, Country)"
          type="text"
          value={location}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="submit" className="btn btn-neutral col-span-full mt-2">
          Save
        </button>
      </div>
    </form>
    </div>
  );
};
export default UserCardForm;
