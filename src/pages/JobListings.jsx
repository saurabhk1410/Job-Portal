import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import JobCard from "../components/JobListing/JobCard";
import jobsData from "../components/JobListing/jobsData";


export const containerVariants = {
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

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const ITEMS_PER_PAGE = 6;

const JobListings = () => {
  const [visibleJobs, setVisibleJobs] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const refreshVisibleJobs = () => {
    const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const applied = JSON.parse(localStorage.getItem("appliedJobs")) || [];

    const filtered = jobsData.filter(
      (job) => !saved.includes(job.id) && !applied.includes(job.id)
    );

    setVisibleJobs(filtered);
  };

  React.useEffect(() => {
    refreshVisibleJobs();
    window.addEventListener("savedJobsChanged", refreshVisibleJobs);
    window.addEventListener("appliedJobsChanged", refreshVisibleJobs);

    return () => {
      window.removeEventListener("savedJobsChanged", refreshVisibleJobs);
      window.removeEventListener("appliedJobsChanged", refreshVisibleJobs);
    };
  }, []);

  const totalPages = Math.ceil(visibleJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentJobs = visibleJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-6">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-24 justify-items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
        >
          {currentJobs.map((job) => (
            <motion.div key={job.id} variants={itemVariants}>
              <JobCard job={job} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-8 gap-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="btn btn-sm btn-outline"
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, idx) => (
            <button
              key={idx + 1}
              onClick={() => handlePageChange(idx + 1)}
              className={`btn btn-sm ${
                currentPage === idx + 1 ? "btn-primary text-white" : "btn-outline"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="btn btn-sm btn-outline"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobListings;
