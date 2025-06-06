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

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchAppliedJobs = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/jobs/applied", { withCredentials: true });
      setAppliedJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError("Failed to fetch applied jobs");
      setAppliedJobs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  return (
    <motion.div
      className="container mx-auto px-8 py-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h1 className="text-3xl font-bold mb-6">Applied Jobs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(appliedJobs) && appliedJobs.length > 0 ? (
            appliedJobs.map((job) => (
              <motion.div key={job._id} variants={itemVariants}>
                <JobCard job={job} forceApplied />
              </motion.div>
            ))
          ) : (
            <p>No Applied jobs yet.</p>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default AppliedJobs;
