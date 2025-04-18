import React, { useEffect, useState } from "react";
import { Trash2, MapPin, CalendarDays, Briefcase } from "lucide-react";
import FloatingInput from "./FloatingInput";

// Duration calculation
const getDuration = (from, to) => {
  const start = new Date(from);
  const end = new Date(to);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (months < 0) {
    years--;
    months += 12;
  }

  let duration = "";
  if (years > 0) duration += `${years} year${years > 1 ? "s" : ""}`;
  if (months > 0) {
    if (duration) duration += " ";
    duration += `${months} month${months > 1 ? "s" : ""}`;
  }

  return duration || "Less than a month";
};

const ExperienceForm = () => {
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({
    company: "",
    location: "",
    mode: "Offline",
    type: "Internship",
    role: "",
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
      type: "Internship",
      role: "",
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
    <div className="relative max-w-3xl mx-auto mt-10">
      <div className="absolute -top-4 left-6 bg-base-100 px-2 text-lg font-semibold text-gray-600">
        Experience
      </div>
      <div className="p-6 border-2 rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <FloatingInput
            label="Company Name"
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
          />

          <FloatingInput
            label="Company Location"
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
          />

          {/* Mode as radio */}
          <div>
            <label className="block font-medium mb-1">Work Mode</label>
            <div className="flex gap-4">
              {["Offline", "Online", "Hybrid"].map((mode) => (
                <label key={mode} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="mode"
                    value={mode}
                    checked={form.mode === mode}
                    onChange={handleChange}
                    className="radio"
                  />
                  {mode}
                </label>
              ))}
            </div>
          </div>

          {/* Type toggle */}
          <div>
            <label className="block font-medium mb-1">Type</label>
            <div className="flex gap-4">
              {["Internship", "Job"].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`px-4 py-2 rounded-full border ${
                    form.type === type
                      ? "bg-neutral text-white"
                      : "bg-base-100 text-neutral border-neutral"
                  }`}
                  onClick={() => setForm((prev) => ({ ...prev, type }))}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Role as text input */}
          <FloatingInput
            label="Role"
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
          />

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
          <button className="btn btn-neutral w-full" onClick={handleAdd}>
            Add Experience
          </button>
        </div>

        {experiences.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-1 px-6 sm:px-16">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="relative p-6 bg-base-200 rounded-2xl shadow-sm hover:shadow-lg border border-base-300 transition-all"
              >
                <button
                  className="absolute top-4 right-4 btn btn-xs btn-square btn-error"
                  onClick={() => handleDelete(exp.company)}
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>

                <h3 className="text-xl font-bold mb-1">{exp.company}</h3>

                {/* Role and Mode */}
                <p className="mb-2 flex items-center gap-2">
                  <Briefcase size={16} className="text-neutral" />
                  <span>{exp.role}</span>
                  <span className="mx-1">•</span>
                  <span>{exp.mode}</span>
                  <span className="mx-1">•</span>
                  <span>{exp.type}</span>
                </p>

                <p className="mb-1 flex items-center gap-2">
                  <MapPin size={16} className="text-neutral" />
                  {exp.location}
                </p>

                <p className="mb-3 flex items-center gap-2">
                  <CalendarDays size={16} className="text-neutral" />
                  {exp.from} - {exp.to}
                  <span className="ml-2 text-sm text-base-content/60 italic">
                    ({getDuration(exp.from, exp.to)})
                  </span>
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
    </div>
  );
};

export default ExperienceForm;
