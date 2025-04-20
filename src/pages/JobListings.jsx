import React from "react";
import { motion } from "framer-motion";
import JobCard from "../components/JobListing/JobCard";
import jobsData from "../components/JobListing/jobsData";
import { useTheme } from "../context/ThemeContext";


import {
  getFromLocalStorage,
} from "../utils/localStorageHelpers";




export const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15, // Animate cards one after another
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};


const JobListings = () => {

  const [jobs, setJobs] = React.useState(jobsData);

  const hiddenIds = [
    ...getFromLocalStorage("savedJobs"),
    ...getFromLocalStorage("appliedJobs"),
  ];

  const filteredJobs = jobs.filter((job) => !hiddenIds.includes(job.id));

  const refreshList = () => {
    const newHidden = [
      ...getFromLocalStorage("savedJobs"),
      ...getFromLocalStorage("appliedJobs"),
    ];
    setJobs(jobsData.filter((job) => !newHidden.includes(job.id)));
  };

  return (
    <motion.div
      className="container mx-auto p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-24 justify-items-center">
        {filteredJobs.map((job) => (
          <motion.div key={job.id} variants={itemVariants}>
            <JobCard job={job} onAction={refreshList} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default JobListings;
