import React from "react";
import jobsData from "../components/JobListing/jobsData";
import JobCard from "../components/JobListing/JobCard";
import { getFromLocalStorage } from "../utils/localStorageHelpers";

const SavedJobs = () => {
  const savedIds = getFromLocalStorage("savedJobs");
  const savedJobs = jobsData.filter((job) => savedIds.includes(job.id));

  return (
    <div className="container mx-auto px-8 py-6">
      <h1 className="text-3xl font-bold mb-6">Saved Jobs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {savedJobs.length > 0 ? (
          savedJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p>No saved jobs yet.</p>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
