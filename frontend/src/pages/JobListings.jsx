/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import JobCard from "../components/JobListing/JobCard";
import { FiFilter, FiX } from "react-icons/fi"; // Importing icons from react-icons
import { FaFilter } from "react-icons/fa";
import { MdFilterAltOff } from "react-icons/md";
import axios from "axios";

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
  const [allJobs, setAllJobs] = useState([]);
  const [visibleJobs, setVisibleJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [filters, setFilters] = useState({
    workMode: "",
    employmentType: "",
    category: ""
  });
  const [showFilters, setShowFilters] = useState(false); // State for toggle
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get("http://localhost:5000/api/jobs", { withCredentials: true });
        setAllJobs(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError("Failed to fetch jobs");
        setAllJobs([]);
      }
      setLoading(false);
    };
    fetchJobs();
  }, []);

  const refreshVisibleJobs = () => {
    const saved = JSON.parse(localStorage.getItem("savedJobs")) || [];
    const applied = JSON.parse(localStorage.getItem("appliedJobs")) || [];

    let filtered = allJobs.filter(
      (job) => !saved.includes(job._id) && !applied.includes(job._id)
    );

    // Apply search and skill filters
    if (selectedSkills.length > 0) {
      filtered = filtered.filter(job =>
        selectedSkills.every(skill =>
          job.skills.some(jobSkill =>
            jobSkill.toLowerCase().includes(skill.toLowerCase())
          )
        )
      );
    }

    // Apply dropdown filters
    if (filters.workMode) {
      filtered = filtered.filter(job => job.workMode === filters.workMode);
    }
    if (filters.employmentType) {
      filtered = filtered.filter(job => job.employmentType === filters.employmentType);
    }
    if (filters.category) {
      filtered = filtered.filter(job => job.category === filters.category);
    }

    setVisibleJobs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  useEffect(() => {
    refreshVisibleJobs();
    window.addEventListener("savedJobsChanged", refreshVisibleJobs);
    window.addEventListener("appliedJobsChanged", refreshVisibleJobs);

    return () => {
      window.removeEventListener("savedJobsChanged", refreshVisibleJobs);
      window.removeEventListener("appliedJobsChanged", refreshVisibleJobs);
    };
    // eslint-disable-next-line
  }, [allJobs, selectedSkills, filters]);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      const newSkill = searchInput.trim();
      if (!selectedSkills.includes(newSkill)) {
        setSelectedSkills([...selectedSkills, newSkill]);
      }
      setSearchInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSelectedSkills(selectedSkills.filter(skill => skill !== skillToRemove));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const clearFilters = () => {
    setSelectedSkills([]);
    setFilters({
      workMode: "",
      employmentType: "",
      category: ""
    });
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const totalPages = Math.ceil(visibleJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentJobs = visibleJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-6">
      {/* Toggle Button - Upper Left Corner */}
      <button
        onClick={toggleFilters}
        className="flex items-center gap-2 sm:mt-0 -mt-8 sm:mb-0 mb-4 cursor-pointer"
      >
        {showFilters ? (
          <>
            <MdFilterAltOff className="sm:w-8 sm:h-8 w-4 h-4 " />
          </>
        ) : (
          <>
            <FaFilter
            className="sm:w-8 sm:h-8 w-4 h-4" />
          </>
        )}
      </button>

      {/* Search and Filter Section - Conditionally rendered */}
      {showFilters && (
        <div className="mb-0 -mt-10 p-6 rounded-lg max-w-3xl mx-auto bg-transparent">
          {/* Search Input with Button */}
          <div className="w-full mb-4">
            <form onSubmit={handleSearchSubmit} className="relative">
              <div className="flex items-center border rounded-lg overflow-hidden">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={handleSearchInputChange}
                  placeholder="Search by skills (react, python, etc.)"
                  className="w-full py-2 pl-10 pr-4 focus:outline-none bg-base-200"
                />
                <button
                  type="submit"
                  className="px-4 py-2 btn btn-neutral transition-colors rounded-l-none"
                >
                  Search
                </button>
              </div>
            </form>
          </div>

          {/* Dropdown Filters */}
          <div className="flex flex-col sm:flex-row gap-3 w-full mb-4">
            <div className="flex-1">
              <select
                name="workMode"
                value={filters.workMode}
                onChange={handleFilterChange}
                className="select border-2 w-full focus:outline-0 bg-base-200"
              >
                <option value="">Work Mode</option>
                <option value="Onsite">Onsite</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            
            <div className="flex-1">
              <select
                name="employmentType"
                value={filters.employmentType}
                onChange={handleFilterChange}
                className="select border-2 w-full focus:outline-0 bg-base-200"
              >
                <option value="">Employment Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
            
            <div className="flex-1">
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="select border-2 w-full focus:outline-0 bg-base-200"
              >
                <option value="">Category</option>
                <option value="Intern">Intern</option>
                <option value="Job">Job</option>
              </select>
            </div>
          </div>

          {/* Bottom row - Selected skills on left, Clear All on right */}
          <div className="flex justify-between items-center">
            {/* Selected Skills - Left side */}
            {selectedSkills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {selectedSkills.map((skill) => (
                  <span
                    key={skill}
                    className="flex px-3 py-1 rounded-full text-sm font-medium badge badge-outline border-black border-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Clear Filters Button - Right side */}
            {(selectedSkills.length > 0 || 
              filters.workMode || 
              filters.employmentType || 
              filters.category) && (
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center ml-auto"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Job Cards */}
      {loading ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">Loading...</h3>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium text-red-500">{error}</h3>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {visibleJobs.length > 0 ? (
            <motion.div
              key={currentPage}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-24 justify-items-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {currentJobs.map((job) => (
                <motion.div key={job._id} variants={itemVariants}>
                  <JobCard job={job} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium">No jobs found matching your criteria</h3>
              <button
                onClick={clearFilters}
                className="btn btn-primary mt-4"
              >
                Clear Filters
              </button>
            </div>
          )}
        </AnimatePresence>
      )}

      {/* Pagination */}
      {visibleJobs.length > 0 && (
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
      )}
    </div>
  );
};

export default JobListings;