import React from "react";
import JobCard from "../components/JobListing/JobCard";
import jobsData from "../components/JobListing/jobsData";
// Mock Job Data


const JobListings = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-24 justify-items-center">
        {jobsData.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
};

export default JobListings;
