/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import JobCard from "../components/JobListing/JobCard";
import axios from "axios";
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

const getSavedJobIds = () => {
  return JSON.parse(localStorage.getItem("savedJobs")) || [];
};

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = React.useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchSavedJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/jobs", { withCredentials: true });
      const savedIds = getSavedJobIds();
      const filteredJobs = res.data.filter((job) => savedIds.includes(job._id));
      setSavedJobs(filteredJobs);
    } catch (err) {
      setError("Failed to fetch saved jobs");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSavedJobs();
    window.addEventListener("savedJobsChanged", fetchSavedJobs);
    return () => window.removeEventListener("savedJobsChanged", fetchSavedJobs);
  }, []);

  return (
    <motion.div
      className="container mx-auto p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-2xl font-bold mb-6">Saved Jobs</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : savedJobs.length === 0 ? (
        <p className="text-gray-500">No saved jobs.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-24 justify-items-center">
          {savedJobs.map((job) => (
            <motion.div key={job._id} variants={itemVariants}>
              <JobCard job={job} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default SavedJobs;
