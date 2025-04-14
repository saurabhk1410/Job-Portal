import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";


const UserCardForm = () => {
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
      alert("Phone number must be valid with country code (e.g. +919876543210)");
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
    <form onSubmit={handleSubmit} className="border-2 max-w-3xl mx-auto rounded-2xl p-6">
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
                    ? "bg-neutral text-neutral-content"
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
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input input-bordered w-full focus:outline-none"
        />

<div className="flex items-center justify-between gap-x-4 px-1">
  <label className="">DOB:</label>
  <input
    type="date"
    value={dob}
    onChange={(e) => setDob(e.target.value)}
    className="input input-bordered text-base-content focus:outline-none w-full"
  />
</div>


        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input input-bordered w-full focus:outline-none"
        />

        <input
          type="url"
          placeholder="LinkedIn Profile URL"
          value={linkedIn}
          onChange={(e) => setLinkedIn(e.target.value)}
          className="input input-bordered w-full focus:outline-none"
        />

        <input
          type="url"
          placeholder="Resume URL"
          value={resumeUrl}
          onChange={(e) => setResumeUrl(e.target.value)}
          className="input input-bordered w-full focus:outline-none"
        />

        <input
          type="tel"
          placeholder="Phone Number (with country code)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input input-bordered w-full focus:outline-none"
        />

        <input
          type="text"
          placeholder="Location (City, State, Country)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="input input-bordered w-full md:col-span-2 focus:outline-none"
        />

        <button type="submit" className="btn btn-neutral col-span-full mt-2">
          Save
        </button>
      </div>
    </form>
  );
};
export default UserCardForm;
