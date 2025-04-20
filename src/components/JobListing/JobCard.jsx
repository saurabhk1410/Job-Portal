import React from "react";
import {
  FaMapMarkerAlt,
  FaBriefcase,
  FaLaptopCode,
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaDatabase,
  FaAws,
  FaGitAlt,
  FaJs,
  FaHtml5,
  FaCss3Alt,
  FaRegBookmark,
} from "react-icons/fa";
import {
  SiTypescript,
  SiRedux,
  SiGraphql,
  SiDocker,
  SiKubernetes,
} from "react-icons/si";
import { FaBookmark } from "react-icons/fa"; // Add FaBookmark
import { useTheme } from "../../context/ThemeContext";

import {
  addToLocalStorage,
  removeFromLocalStorage,
  isInLocalStorage,
} from "../../utils/localStorageHelpers";

const skillIcons = {
  react: <FaReact />,
  javascript: <FaJs />,
  typescript: <SiTypescript />,
  node: <FaNodeJs />,
  python: <FaPython />,
  java: <FaJava />,
  html: <FaHtml5 />,
  css: <FaCss3Alt />,
  database: <FaDatabase />,
  aws: <FaAws />,
  git: <FaGitAlt />,
  redux: <SiRedux />,
  graphql: <SiGraphql />,
  docker: <SiDocker />,
  kubernetes: <SiKubernetes />,
};

const getSkillIcon = (skill) => {
  const lowerSkill = skill.toLowerCase();
  for (const [key, icon] of Object.entries(skillIcons)) {
    if (lowerSkill.includes(key)) {
      return icon;
    }
  }
  return <FaLaptopCode />;
};

const JobCard = ({ job, onAction }) => {
  const [isSaved, setIsSaved] = React.useState(
    isInLocalStorage("savedJobs", job.id)
  );
  const [isApplied, setIsApplied] = React.useState(
    isInLocalStorage("appliedJobs", job.id)
  );

  const handleSave = () => {
    if (isSaved) {
      removeFromLocalStorage("savedJobs", job.id);
    } else {
      addToLocalStorage("savedJobs", job.id);
    }
    setIsSaved(!isSaved);
    onAction?.(); // callback to hide on save
  };

  const handleApply = () => {
    if (!isApplied) {
      addToLocalStorage("appliedJobs", job.id);
      setIsApplied(true);
      onAction?.(); // callback to hide on apply
      window.open(job.applyLink, "_blank");
    }
  };

  const { theme } = useTheme();
  // const [isSaved, setIsSaved] = React.useState(false); // 🔄 Save state

  return (
    <div className="relative card transition-all duration-200 border-2 rounded-lg p-6 w-full max-w-md">
      {/* ✅ Save Icon Top Right */}
      <div className="tooltip absolute top-3 right-3 z-10" data-tip={isSaved ? "Unsave" : "Save"}>
        <button className="cursor-pointer" onClick={handleSave}>
          {isSaved ? <FaBookmark className="text-xl" /> : <FaRegBookmark className="text-xl" />}
        </button>
      </div>

      {/* Logo + Title + Company + Location */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={job.logo}
          alt={job.company}
          className="w-14 h-14 rounded-full object-contain"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/64?text=Logo";
            e.target.onerror = null;
          }}
        />
        <div className="flex flex-col justify-center gap-0">
          <h2 className="text-xl font-mono">{job.title}</h2>
          <p className="font-serif">{job.company}</p>
          <p className="font-sans">{job.location}</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-3 mt-2">
        {/* Badges */}
        <div className="flex justify-center gap-6">
          <span className="bg-blue-300 text-blue-950 badge border-0">
            {job.category}
          </span>
          <span className="badge bg-blue-300 text-blue-950 border-0">
            {job.workMode}
          </span>
          <span className="badge bg-blue-300 text-blue-950 border-0">
            {job.employmentType}
          </span>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {job.skills.map((skill, i) => (
            <span
              key={i}
              className="border-0 w-24 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium badge bg-purple-100 text-purple-800  gap-1.5 "
            >
              {getSkillIcon(skill)}
              {skill}
            </span>
          ))}
        </div>

        {/* Experience + Salary */}
        <div className="flex items-center justify-around">
          <span className="flex items-center gap-1.5">
            <FaLaptopCode />
            {job.experienceLevel}
          </span>
          <p className="font-mono ">{job.salary}</p>
        </div>
      </div>

      {/* Apply Button */}
      <div className="flex flex-col items-start mt-2">
        <button
          onClick={handleApply}
          className={`btn ${isApplied ? "btn-disabled" : "btn-neutral"} w-full`}
        >
          {isApplied ? "Applied" : "Apply Now"}
        </button>
      </div>

      {/* ✅ Job Posted Date – Bottom Left on Border */}
      <p
        className={`absolute -bottom-2.5 left-4 text-xs px-2 ${
          theme == "light" ? "bg-purple-200" : "bg-base-100"
        }`}
      >
        Posted {job.postedDate}
      </p>
    </div>
  );
};

export default JobCard;
