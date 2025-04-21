/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiBriefcase,
  FiUser,
  FiAward,
  FiZap,
  FiStar,
  FiMapPin,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import jobsData from "../components/JobListing/jobsData";
import { containerVariants, itemVariants } from "./JobListings";
import JobCard from "../components/JobListing/JobCard";

const LandingPage = () => {
  const navigate = useNavigate();
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const featuredJobs = [
    {
      title: "Frontend Developer (React)",
      company: "TechCorp",
      type: "Full-time",
      location: "Remote",
      salary: "$90,000 - $120,000",
      skills: ["React", "TypeScript", "CSS"],
    },
    {
      title: "Backend Engineer",
      company: "DataSystems",
      type: "Full-time",
      location: "San Francisco, CA",
      salary: "$110,000 - $140,000",
      skills: ["Node.js", "Python", "AWS"],
    },
    {
      title: "UX/UI Designer",
      company: "CreativeMinds",
      type: "Contract",
      location: "Remote",
      salary: "$70 - $90/hr",
      skills: ["Figma", "Sketch", "User Research"],
    },
  ];

  const testimonials = [
    {
      quote:
        "Found my dream job in 2 weeks! The application process was so smooth.",
      author: "Sarah K., Frontend Developer",
      role: "Hired at TechStart Inc.",
    },
    {
      quote:
        "As a recent grad, CodeRound helped me land my first dev role with great mentorship opportunities.",
      author: "Miguel T., Junior Developer",
      role: "Hired at CodeCraft",
    },
    {
      quote:
        "The salary filters saved me hours of negotiation headaches. Got a 20% raise from my last position!",
      author: "Priya M., Fullstack Engineer",
      role: "Hired at DataWorks",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-4xl md:text-6xl font-bold  dark:text-gray-300 mb-6"
          >
            Find Your Perfect Tech Job
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
            className="text-xl text-primary font-semibold bg-clip-text max-w-2xl mx-auto mt-10 mb-10"
          >
            CodeRound matches developers with opportunities that align with
            their skills and career goals.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-20"
          >
            <button className="btn btn-neutral px-8 py-6 text-lg font-medium" onClick={()=>navigate("/jobs")}>
              Browse Jobs
            </button>
            <button className="btn btn-outline px-8 py-6 text-lg font-medium" onClick={()=>navigate("/about")}>
              How It Works
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
          {[
            { value: "10K+", label: "Tech Jobs" },
            { value: "5K+", label: "Hired Developers" },
            { value: "85%", label: "Match Success Rate" },
            { value: "3.2K", label: "Remote Positions" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ delay: 0.1 * index }}
              className="p-6"
            >
              <div className="text-4xl font-bold bg-gradient-to-r mb-2">
                {stat.value}
              </div>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 max-w-6xl mx-auto px-4">
  <motion.h2
    initial="hidden"
    animate="visible"
    variants={fadeIn}
    className="text-3xl font-bold text-center mb-16 text-base-content"
  >
    Why Developers Choose CodeRound
  </motion.h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      {
        icon: <FiSearch />,
        title: "Smart Job Matching",
        desc: "Our algorithm learns your preferences to surface the most relevant opportunities.",
      },
      {
        icon: <FiBriefcase />,
        title: "Salary Transparency",
        desc: "See salary ranges upfront - no more guessing games during interviews.",
      },
      {
        icon: <FiZap />,
        title: "Quick Apply",
        desc: "One-click applications with pre-filled information from your profile.",
      },
    ].map((feature, index) => (
      <motion.div
        key={index}
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ delay: 0.1 * index }}
        className=" border-2 p-6 rounded-2xl hover:shadow-xl transition-all duration-300"
      >
        <div className="p-4 bg-primary/20 text-primary rounded-full w-max mb-4 shadow-md">
          {React.cloneElement(feature.icon, { className: "text-2xl" })}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-base-content">
          {feature.title}
        </h3>
        <p className="text-base-content/70 text-sm leading-relaxed">
          {feature.desc}
        </p>
      </motion.div>
    ))}
  </div>
</section>


      {/* Job Listings Preview */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-6"
          >
            Featured Tech Opportunities
          </motion.h2>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
            className="text-gray-600 dark:text-gray-400 text-center text-lg mb-12 max-w-2xl mx-auto"
          >
            Curated selection of high-quality tech jobs
          </motion.p>

          <motion.div
            className="container mx-auto px-4 sm:px-6 lg:px-0 py-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 ">
              {jobsData.slice(0, 3).map((job) => (
                <motion.div key={job.id} variants={itemVariants}>
                  <JobCard job={job} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="text-center mt-10"
          >
            <button
              className="btn btn-neutral  px-8 py-6"
              onClick={() => navigate("/jobs")}
            >
              View All Jobs
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-16"
          >
            Success Stories
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ delay: 0.1 * index }}
                className=" p-8 rounded-xl border-2"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-6">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
