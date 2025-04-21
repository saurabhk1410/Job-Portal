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

const ExperienceForm = () => {
  const {theme}=useTheme();
  const [experiences, setExperiences] = useState([]);
  const [form, setForm] = useState({
    company: "",
    location: "",
    mode: "Offline",
    type: "Internship",
    role: "",
    from: "",
    to: "",
    salary:0
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
      salary:0
    });
  };

  const handleDelete = (company) => {
    const updated = experiences.filter((exp) => exp.company !== company);
    setExperiences(updated);
    localStorage.setItem("experiences", JSON.stringify(updated));
  };

  return (
    <div className="relative max-w-3xl mx-auto mt-10">
      <div className={`absolute -top-4 left-6 px-2 text-lg font-semibold  ${theme=="light"?"bg-purple-100":"bg-base-100"}`}>
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

        {/* Mode as buttons behaving like radio */}
<div>
  <div className="flex gap-0">
    {["Offline", "Online", "Hybrid"].map((mode) => (
   <button
   key={mode}
   type="button"
   onClick={() => handleChange({ target: { name: "mode", value: mode } })}
   className={`px-4 py-2 cursor-pointer border transition-colors duration-200
     ${
       form.mode === mode
         ? "bg-neutral text-white border-0"
         : `${theme === "light" ? "bg-purple-100" : "bg-base-200"} text-base-content hover:bg-base-300`
     }`}
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
        className={`px-4 py-2 cursor-pointer border transition-colors duration-200
          ${form.type === type
            ? "bg-neutral text-white border-0"
            : `${theme === "light" ? "bg-purple-100" : "bg-base-200"} text-base-content hover:bg-base-300`
            }`}
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
          <button className="btn btn-neutral w-full" onClick={handleAdd}>
            Add Experience
          </button>
        </div>

        {experiences.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-1 px-6 sm:px-16">
            {experiences.map((exp, idx) => (
          <div
          key={idx}
          className="bg-info/40 relative p-6 rounded-2xl shadow-sm hover:shadow-lg border border-base-300 transition-all hover:border-primary/30 group"
        >
          {/* Delete button with DaisyUI classes */}
          <button
            className="absolute top-4 right-4 btn btn-sm btn-square btn-error transition-opacity hover:scale-110"
            onClick={() => handleDelete(exp.company)}
            title="Delete"
            aria-label={`Delete ${exp.company} experience`}
          >
            <Trash2 size={16} />
          </button>
        
          {/* Company name with accent */}
          <div className="flex gap-4 items-center mb-3">
            <h3 className="text-xl font-bold">{exp.role}</h3>
        
            <span className="badge badge-primary border-primary/30 text-sm">
              {exp.mode}
            </span>
        
            <span className="badge badge-primary border-primary/30 text-sm">
              {exp.type}
            </span>
          </div>
        
          {/* Role and Mode - using DaisyUI badges */}
          <div className="flex items-center gap-2 mb-2">
            <Briefcase size={18} className="text-primary/80" />
            <span className="">{exp.company}</span>
          </div>
        
          {/* Details grid for better alignment */}
          <div className="grid gap-2">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary/80" />
              <span>{exp.location}</span>
            </div>
        
            <div className="flex items-center gap-2">
              <CalendarDays size={16} className="text-primary/80" />
              <span>
                {exp.from} to {exp.to}
                <span className="ml-2 text-sm text-base-content/60 italic">
                  ({getDuration(exp.from, exp.to)})
                </span>
              </span>
            </div>
        
            <div className="flex items-center gap-2 badge badge-neutral p-4">
              <FaIndianRupeeSign size={16} className="" />
              <span className="font-medium ">
                {exp.salary} <span className="font-normal">per month</span>
              </span>
            </div>
          </div>
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
