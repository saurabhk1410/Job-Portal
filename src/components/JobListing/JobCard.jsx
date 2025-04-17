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

const JobCard = ({ job }) => {
    const [isSaved, setIsSaved] = React.useState(false); // 🔄 Save state

  return (
    <div className="relative card transition-all duration-200 border-2 rounded-lg p-6 w-full max-w-md">

      {/* ✅ Save Icon Top Right */}
      <button
        className="absolute top-3 right-3 text-gray-500 hover:text-blue-600 cursor-pointer" 
        title={isSaved ? "Unsave this job" : "Save this job"}
        onClick={() => setIsSaved(!isSaved)}
      >
        {isSaved ? (
          <FaBookmark className="text-xl text-blue-600" />
        ) : (
          <FaRegBookmark className="text-xl" />
        )}
      </button>

      {/* Logo + Title + Company + Location */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={job.logo}
          alt={job.company}
          className="w-20 h-20 rounded-full object-contain"
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
          <span className="badge badge-neutral">{job.category}</span>
          <span className="badge badge-neutral">{job.workMode}</span>
          <span className="badge badge-neutral">{job.employmentType}</span>
        </div>

        {/* Skills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {job.skills.map((skill, i) => (
            <span
              key={i}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 gap-1.5"
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
          <p className="font-mono">{job.salary}</p>
        </div>
      </div>

      {/* Apply Button */}
      <div className="flex flex-col items-start mt-2">
        <a
          href={job.applyLink}
          className="btn btn-outline hover:btn-neutral w-full"
        >
          Apply Now
        </a>
      </div>

      {/* ✅ Job Posted Date – Bottom Left on Border */}
      <p className="absolute -bottom-2.5 left-4 bg-base-100 text-xs px-2">
        Posted {job.postedDate}
      </p>
    </div>
  );
};

export default JobCard;
