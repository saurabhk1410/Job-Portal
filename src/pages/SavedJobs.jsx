import React from "react";
import JobCard from "../components/JobListing/JobCard";
import jobsData from "../components/JobListing/jobsData";
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

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = React.useState([]);

  const refreshSaved = () => {
    const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const filteredJobs = jobsData.filter((job) => saved.includes(job.id));
    setSavedJobs(filteredJobs);
  };

  React.useEffect(() => {
    refreshSaved();
    window.addEventListener("savedJobsChanged", refreshSaved);
    return () => window.removeEventListener("savedJobsChanged", refreshSaved);
  }, []);

  return (
    <motion.div
      className="container mx-auto p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-bold mb-6">Saved Jobs</h2>
      {savedJobs.length === 0 ? (
        <p className="text-gray-500">No saved jobs.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-24 justify-items-center">
          {savedJobs.map((job) => (
            <motion.div key={job.id} variants={itemVariants}>
              <JobCard job={job} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SavedJobs;
