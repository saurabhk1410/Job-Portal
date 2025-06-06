import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import FloatingInput from "./FloatingInput"; // adjust path if needed
import { useTheme } from "../../context/ThemeContext";

const PersonalInfo = ({ user, onUserUpdate }) => {
  const { theme } = useTheme();
  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "",
    email: "",
    linkedIn: "",
    resumeUrl: "",
    phone: "",
    location: "",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Initialize state from user prop
  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        dob: user.dob ? user.dob.slice(0, 10) : "",
        gender: user.gender || "",
        email: user.email || "",
        linkedIn: user.linkedIn || "",
        resumeUrl: user.resumeUrl || "",
        phone: user.phone || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Invalid email format");
      return;
    }
    if (form.linkedIn && !form.linkedIn.startsWith("https://linkedin.com")) {
      setError("LinkedIn URL must start with https://linkedin.com/");
      return;
    }
    if (form.resumeUrl && !/^https?:\/\//.test(form.resumeUrl)) {
      setError("Resume URL must start with http:// or https://");
      return;
    }
    if (!/^\+?\d{10,15}$/.test(form.phone)) {
      setError("Phone number must be valid with country code (e.g. +919876543210)");
      return;
    }

    // Only send changed fields
    const changedFields = {};
    Object.keys(form).forEach((key) => {
      if (form[key] !== (user[key] || "")) {
        changedFields[key] = form[key];
      }
    });
    if (Object.keys(changedFields).length === 0) {
      setSuccess("No changes to save.");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(changedFields),
      });
      if (!res.ok) throw new Error("Failed to update profile");
      onUserUpdate(changedFields);
      setSuccess("Profile updated successfully!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto mt-6">
      <form
        onSubmit={handleSubmit}
        className="border-2 rounded-2xl p-6 pt-10 font-semibold"
      >
        <span
          className={`absolute -top-4 left-6   ${theme === "light" ? "bg-purple-100" : "bg-base-100"} px-2 text-lg font-semibold `}
        >
          Personal Info
        </span>
        <div className="flex flex-col items-center mb-4">
          {/* Uploadable Profile Photo */}
          {/* <label htmlFor="photo-upload" className="cursor-pointer relative group"> */}
            {/* Placeholder for profile photo */}
            {/* <div className="w-20 h-20 flex items-center justify-center rounded-full border-2 bg-base-200 text-base-content"> */}
              {/* <FaUser className="text-5xl" /> */}
            {/* </div> */}
          {/* </label> */}

          {/* Gender */}
          <div className="flex gap-2 items-center justify-center mt-4">
            {["Male", "Female", "Other"].map((g) => (
              <label key={g} className="cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={form.gender === g}
                  onChange={handleChange}
                  className="hidden"
                />
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm transition ${
                    form.gender === g
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

        {/* Error/Success */}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}

        {/* Form Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FloatingInput
            label="Full Name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <FloatingInput
            label="Date Of Birth"
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
          />
          <FloatingInput
            label="Email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
          />

          <FloatingInput
            label="LinkedIn Profile URL"
            type="url"
            name="linkedIn"
            value={form.linkedIn}
            onChange={handleChange}
          />

          <FloatingInput
            label="Resume URL"
            type="url"
            name="resumeUrl"
            value={form.resumeUrl}
            onChange={handleChange}
          />

          <FloatingInput
            label="Phone Number (with country code)"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />

          <FloatingInput
            label="Location (City, State, Country)"
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="btn btn-neutral col-span-full mt-2"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;
