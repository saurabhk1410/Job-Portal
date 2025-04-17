import React, { useEffect, useState } from "react";
import { Trash2, MapPin, CalendarDays, Briefcase } from "lucide-react";

const ExperienceForm = () => {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({
    company: "",
    location: "",
    mode: "Offline",
    role: "Intern",
    from: "",
    to: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("experiences"));
    if (saved) setExperiences(saved);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    const trimmedCompany = form.company.trim();
    if (!trimmedCompany) return;

    const newEntry = { ...form };
    const updated = [...experiences, newEntry];
    setExperiences(updated);
    localStorage.setItem("experiences", JSON.stringify(updated));

    setForm({
      company: "",
      location: "",
      mode: "Offline",
      role: "Intern",
      from: "",
      to: "",
    });
  };

  const handleDelete = (company) => {
    const updated = experiences.filter((exp) => exp.company !== company);
    setExperiences(updated);
    localStorage.setItem("experiences", JSON.stringify(updated));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 border-2 rounded-2xl">
        
      <h2 className="text-2xl font-bold text-center mb-6">Experience Tracker</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <input
          type="text"
          name="company"
          value={form.company}
          onChange={handleChange}
          placeholder="Company Name"
          className="input input-bordered w-full focus:outline-0"
        />
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Company Location"
          className="input input-bordered w-full focus:outline-0"
        />

        <select
          name="mode"
          value={form.mode}
          onChange={handleChange}
          className="select select-bordered w-full focus:outline-0"
        >
          <option>Offline</option>
          <option>Online</option>
          <option>Hybrid</option>
        </select>

        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="select select-bordered w-full focus:outline-0"
        >
          <option>Intern</option>
          <option>Software Engineer</option>
          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>Fullstack Developer</option>
          <option>Project Manager</option>
          <option>Designer</option>
          <option>Other</option>
        </select>

        <input
          type="date"
          name="from"
          value={form.from}
          onChange={handleChange}
          className="input input-bordered w-full focus:outline-0"
        />
        <input
          type="date"
          name="to"
          value={form.to}
          onChange={handleChange}
          className="input input-bordered w-full focus:outline-0"
        />
      </div>

      <div className="text-center">
        <button className="btn btn-neutral w-40" onClick={handleAdd}>
          Add Experience
        </button>
      </div>


{experiences.length > 0 ? (
  <div className="mt-10 grid gap-6 sm:grid-cols-2 ">
    {experiences.map((exp, idx) => (
      <div
        key={idx}
        className=" relative p-6 bg-base-200 rounded-2xl shadow-sm hover:shadow-lg border border-base-300 transition-all"
      >
        {/* Delete Button */}
        <button
          className="absolute top-4 right-4 btn btn-xs btn-square btn-error"
          onClick={() => handleDelete(exp.company)}
          title="Delete"
        >
          <Trash2 size={16} />
        </button>

        {/* Company Name */}
        <h3 className="text-xl font-bold mb-1">{exp.company}</h3>

        {/* Role and Mode */}
        <p className="mb-2 flex items-center gap-2">
          <Briefcase size={16} className="text-neutral" />
          <span>{exp.role}</span>
          <span className="mx-1">•</span>
          <span>{exp.mode}</span>
        </p>

        {/* Location */}
        <p className="mb-1 flex items-center gap-2">
          <MapPin size={16} className="text-neutral" />
          {exp.location}
        </p>

        {/* Duration */}
        <p className=" mb-3 flex items-center gap-2">
          <CalendarDays size={16} className="text-neutral" />
          {exp.from} - {exp.to}
        </p>

      </div>
    ))}
  </div>
) : (
  <p className="text-center text-base-content/50 mt-6 italic">
    No experiences added yet.
  </p>
)}


    </div>
  );
};

export default ExperienceForm;
