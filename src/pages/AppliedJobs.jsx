/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import jobsData from "../components/JobListing/jobsData";
import JobCard from "../components/JobListing/JobCard";
import { getFromLocalStorage } from "../utils/localStorageHelpers";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);

  const refreshAppliedJobs = () => {
    const AppliedIds = getFromLocalStorage("appliedJobs");
    const filteredJobs = jobsData.filter((job) => AppliedIds.includes(job.id));
    setAppliedJobs(filteredJobs);
  };

  useEffect(() => {
    refreshAppliedJobs();
    window.addEventListener("appliedJobsChanged", refreshAppliedJobs);
    return () => window.removeEventListener("appliedJobsChanged", refreshAppliedJobs);
  }, []);

  return (
    <motion.div
      className="container mx-auto px-8 py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-3xl font-bold mb-6">Applied Jobs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {appliedJobs.length > 0 ? (
          appliedJobs.map((job) => (
            <motion.div key={job.id} variants={itemVariants}>
              <JobCard job={job} />
            </motion.div>
          ))
        ) : (
          <p>No Applied jobs yet.</p>
        )}
      </div>
    </motion.div>
  );
};

export default AppliedJobs;
