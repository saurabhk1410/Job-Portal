import React, { useEffect, useState } from "react";
import { Trash2, MapPin, CalendarDays, Briefcase } from "lucide-react";
import FloatingInput from "./FloatingInput";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useTheme } from "../../context/ThemeContext";
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

const ExperienceForm = ({ experience: initialExperience = [], onExperienceUpdate }) => {
  const { theme } = useTheme();
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({
    company: "",
    location: "",
    mode: "Offline",
    type: "Internship",
    role: "",
    from: "",
    to: "",
    salary: 0,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setExperiences(initialExperience);
  }, [initialExperience]);

  const patchExperience = async (updatedExperience) => {
    setSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:5000/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ experience: updatedExperience }),
        credentials: 'include'
      });
      if (!res.ok) throw new Error("Failed to update experience");
      setExperiences(updatedExperience);
      onExperienceUpdate(updatedExperience);
      setSuccess("Experience updated!");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    const trimmedCompany = form.company.trim();
    if (!trimmedCompany) return;
    const newEntry = { ...form };
    const updated = [...experiences, newEntry];
    patchExperience(updated);
    setForm({
      company: "",
      location: "",
      mode: "Offline",
      type: "Internship",
      role: "",
      from: "",
      to: "",
      salary: 0,
    });
  };

  const handleDelete = (company) => {
    const updated = experiences.filter((exp) => exp.company !== company);
    patchExperience(updated);
  };

  return (
    <div className="relative max-w-3xl mx-auto mt-10">
      <div className={`absolute -top-4 left-6 px-2 text-lg font-semibold  ${theme == "light" ? "bg-purple-100" : "bg-base-100"}`}>
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
          <div>
            <div className="flex gap-0">
              {["Offline", "Online", "Hybrid"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleChange({ target: { name: "mode", value: mode } })}
                  className={`px-4 py-2 cursor-pointer border transition-colors duration-200 ${form.mode === mode ? "bg-neutral text-white border-0" : `${theme === "light" ? "bg-purple-100" : "bg-base-200"} text-base-content hover:bg-base-300`}`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="flex gap-0">
              {["Internship", "Job"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setForm((prev) => ({ ...prev, type }))}
                  className={`px-4 py-2 cursor-pointer border transition-colors duration-200 ${form.type === type ? "bg-neutral text-white border-0" : `${theme === "light" ? "bg-purple-100" : "bg-base-200"} text-base-content hover:bg-base-300`}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
          <FloatingInput
            label="Role"
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
          />
          <FloatingInput
            label="Salary/Stipend (Rupees)"
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
          />
          <FloatingInput
            label="From"
            type="date"
            name="from"
            value={form.from}
            onChange={handleChange}
            max={form.to}
          />
          <FloatingInput
            label="To"
            type="date"
            name="to"
            value={form.to}
            onChange={handleChange}
            min={form.from}
          />
        </div>
        <div className="text-center">
          <button className="btn btn-neutral w-full" onClick={handleAdd} disabled={saving}>
            {saving ? "Saving..." : "Add Experience"}
          </button>
        </div>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-600 mb-2">{success}</div>}
        {experiences.length > 0 ? (
          <div className="mt-10 grid gap-6 grid-cols-1 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            {experiences.map((exp, idx) => (
              <div
                key={idx}
                className="bg-info/40 relative p-4 sm:p-6 rounded-xl md:rounded-2xl shadow-sm hover:shadow-md md:hover:shadow-lg border border-base-300 transition-all hover:border-primary/30 group"
              >
                <button
                  className="absolute top-2 right-2 sm:top-4 sm:right-4 btn btn-xs sm:btn-sm btn-square btn-error transition-opacity hover:scale-110"
                  onClick={() => handleDelete(exp.company)}
                  title="Delete"
                  aria-label={`Delete ${exp.company} experience`}
                  disabled={saving}
                >
                  <Trash2 size={14} className="sm:size-4" />
                </button>
                <div className="flex flex-col sm:flex-row sm:gap-4 sm:items-center mb-3 gap-2">
                  <h3 className="text-lg sm:text-xl font-bold">{exp.role}</h3>
                  <div className="flex gap-2">
                    <span className="badge badge-primary border-primary/30 text-xs sm:text-sm">
                      {exp.mode}
                    </span>
                    <span className="badge badge-primary border-primary/30 text-xs sm:text-sm">
                      {exp.type}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase size={16} className="text-primary/80 min-w-[16px]" />
                  <span className="text-sm sm:text-base">{exp.company}</span>
                </div>
                <div className="grid gap-1 sm:gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-primary/80 min-w-[14px] sm:min-w-[16px]" />
                    <span className="text-sm sm:text-base">{exp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={14} className="text-primary/80 min-w-[14px] sm:min-w-[16px]" />
                    <span className="text-sm sm:text-base">
                      {exp.from} to {exp.to}
                      <span className="ml-1 sm:ml-2 text-xs sm:text-sm text-base-content/60 italic">
                        ({getDuration(exp.from, exp.to)})
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 badge badge-neutral p-2 sm:p-3 mt-1">
                    <FaIndianRupeeSign size={14} className="sm:size-4" />
                    <span className="text-sm sm:text-base font-medium">
                      {exp.salary} <span className="font-normal">per month</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-base-content/50 mt-6 italic text-sm sm:text-base">
            No experiences added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default ExperienceForm;
