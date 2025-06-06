/* eslint-disable no-unused-vars */
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
import axios from "axios";

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

const JobCard = ({ job, onAction, forceApplied }) => {
  const [isApplied, setIsApplied] = React.useState(
    forceApplied ? true : isInLocalStorage("appliedJobs", job._id)
  );

  const handleApply = async () => {
    if (!isApplied) {
      try {
        await axios.post(`http://localhost:5000/api/jobs/${job._id}/apply`, {}, { withCredentials: true });
        setIsApplied(true);
        onAction?.(); // callback to hide on apply
        // Optionally update localStorage for instant UI feedback
        // addToLocalStorage("appliedJobs", job._id);
        // window.dispatchEvent(new Event("appliedJobsChanged"));
      } catch (err) {
        alert("Failed to apply for job. Please try again.");
      }
    }
  };

  const { theme } = useTheme();

  return (
    <div className="relative card transition-all duration-200 border-2 rounded-lg p-6 w-full max-w-[350px] mx-auto">
      {/* Job Details (No Logo) */}
      <div className="flex flex-col gap-1 mb-4">
        <h2 className="text-xl font-mono whitespace-nowrap">{job.jobRole || job.title}</h2>
        <p className="font-serif">{job.companyName || job.company}</p>
        <p className="font-sans">{job.location}</p>
      </div>

      <div className="flex flex-col gap-4 px-3 mt-2">
        {/* Badges */}
        <div className="flex justify-center gap-6">
          {job.category && (
            <span className="bg-blue-300 text-blue-950 badge border-0 whitespace-nowrap">
              {job.category}
            </span>
          )}
          {job.workMode && (
            <span className="badge bg-blue-300 text-blue-950 border-0 whitespace-nowrap">
              {job.workMode}
            </span>
          )}
          {job.employmentType && (
            <span className="badge bg-blue-300 text-blue-950 border-0 whitespace-nowrap">
              {job.employmentType}
            </span>
          )}
        </div>

        {/* Skills */}
        {Array.isArray(job.skills) && job.skills.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 sm:gap-x-8 gap-y-2">
            {job.skills.map((skill, i) => (
              <span
                key={i}
                className="border-0 w-24 flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium badge bg-purple-100 text-purple-800"
              >
                {getSkillIcon(skill)}
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Experience + Salary */}
        <div className="flex items-center justify-around">
          {job.minExperience !== undefined || job.experienceLevel ? (
            <span className="flex items-center gap-1.5">
              <FaLaptopCode />
              {job.minExperience !== undefined ? `${job.minExperience}+ years` : job.experienceLevel}
            </span>
          ) : null}
          <p className="font-mono ">{job.salaryRange || job.salary}</p>
        </div>
      </div>

      {/* Apply Button */}
      <div className="flex flex-col items-start mt-2">
        <button
          onClick={handleApply}
          className={`btn ${isApplied || forceApplied ? "btn-disabled" : "btn-neutral"} w-full`}
          disabled={isApplied || forceApplied}
        >
          {isApplied || forceApplied ? "Applied" : "Apply Now"}
        </button>
      </div>

      {/* ✅ Job Posted Date – Bottom Left on Border */}
      {job.postedDate && (
        <p
          className={`absolute -bottom-2.5 left-4 text-xs px-2 ${
            theme == "light" ? "bg-purple-100" : "bg-base-100"
          }`}
        >
          Posted {job.postedDate}
        </p>
      )}
    </div>
  );
};

export default JobCard;
