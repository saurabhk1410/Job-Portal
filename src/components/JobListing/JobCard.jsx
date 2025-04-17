import React from "react";
import { FaMapMarkerAlt, FaBriefcase, FaLaptopCode } from "react-icons/fa";

const JobCard = ({ job }) => {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition">
      <div className="card-body flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* Left */}
        <div className="flex items-start gap-4">
          <img
            src={job.logo}
            alt={job.company}
            className="w-14 h-14 rounded-md object-cover"
          />
          <div>
            <h2 className="text-lg font-bold">{job.title}</h2>
            <p className="text-sm text-base-content/80">{job.company}</p>
            <div className="flex flex-wrap text-sm gap-2 mt-1 text-base-content/60">
              <span className="flex items-center gap-1"><FaMapMarkerAlt /> {job.location}</span>
              <span className="flex items-center gap-1"><FaBriefcase /> {job.type}</span>
              <span className="flex items-center gap-1"><FaLaptopCode /> {job.experienceLevel}</span>
              {job.remote && (
                <span className="badge badge-accent">Remote</span>
              )}
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col items-start md:items-end gap-2">
          <div className="flex gap-1 flex-wrap">
            {job.skills.map((skill, i) => (
              <div key={i} className="badge badge-outline">{skill}</div>
            ))}
          </div>
          <p className="text-sm text-base-content/80">💰 {job.salary}</p>
          <a href={job.applyLink} className="btn btn-sm btn-primary">Apply Now</a>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
