import React from "react";
import { motion } from "framer-motion";
import { FiSearch, FiBriefcase, FiUser, FiAward, FiZap, FiStar, FiMapPin, FiClock } from "react-icons/fi";

const LandingPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const featuredJobs = [
    {
      title: "Frontend Developer (React)",
      company: "TechCorp",
      type: "Full-time",
      location: "Remote",
      salary: "$90,000 - $120,000",
      skills: ["React", "TypeScript", "CSS"]
    },
    {
      title: "Backend Engineer",
      company: "DataSystems",
      type: "Full-time",
      location: "San Francisco, CA",
      salary: "$110,000 - $140,000",
      skills: ["Node.js", "Python", "AWS"]
    },
    {
      title: "UX/UI Designer",
      company: "CreativeMinds",
      type: "Contract",
      location: "Remote",
      salary: "$70 - $90/hr",
      skills: ["Figma", "Sketch", "User Research"]
    }
  ];

  const testimonials = [
    {
      quote: "Found my dream job in 2 weeks! The application process was so smooth.",
      author: "Sarah K., Frontend Developer",
      role: "Hired at TechStart Inc."
    },
    {
      quote: "As a recent grad, CodeRound helped me land my first dev role with great mentorship opportunities.",
      author: "Miguel T., Junior Developer",
      role: "Hired at CodeCraft"
    },
    {
      quote: "The salary filters saved me hours of negotiation headaches. Got a 20% raise from my last position!",
      author: "Priya M., Fullstack Engineer",
      role: "Hired at DataWorks"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6"
          >
            Find Your Perfect Tech Job
          </motion.h1>
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-10"
          >
            CodeRound matches developers with opportunities that align with their skills and career goals.
          </motion.p>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button className="btn btn-primary px-8 py-3 text-lg font-medium">
              Browse Jobs
            </button>
            <button className="btn btn-outline border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-medium">
              How It Works
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-4 gap-8 text-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
            className="p-6"
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">10K+</div>
            <p className="text-gray-600">Tech Jobs</p>
          </motion.div>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="p-6"
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">5K+</div>
            <p className="text-gray-600">Hired Developers</p>
          </motion.div>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className="p-6"
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">85%</div>
            <p className="text-gray-600">Match Success Rate</p>
          </motion.div>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="p-6"
          >
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">3.2K</div>
            <p className="text-gray-600">Remote Positions</p>
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <motion.h2 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-3xl font-bold text-center mb-16"
        >
          Why Developers Choose CodeRound
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="p-3 bg-blue-100 rounded-lg text-blue-600 w-max mb-4">
              <FiSearch className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Smart Job Matching</h3>
            <p className="text-gray-600">
              Our algorithm learns your preferences to surface the most relevant opportunities.
            </p>
          </motion.div>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="p-3 bg-purple-100 rounded-lg text-purple-600 w-max mb-4">
              <FiBriefcase className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Salary Transparency</h3>
            <p className="text-gray-600">
              See salary ranges upfront - no more guessing games during interviews.
            </p>
          </motion.div>
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600 w-max mb-4">
              <FiZap className="text-2xl" />
            </div>
            <h3 className="text-xl font-bold mb-3">Quick Apply</h3>
            <p className="text-gray-600">
              One-click applications with pre-filled information from your profile.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Job Listings Preview */}
      <section className="bg-gray-50 py-20">
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
            className="text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          >
            Curated selection of high-quality tech jobs
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <motion.div
                key={index}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ delay: 0.1 * index }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                <p className="text-gray-700 mb-4">{job.company}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge badge-outline flex items-center gap-1"><FiBriefcase /> {job.type}</span>
                  <span className="badge badge-outline flex items-center gap-1"><FiMapPin /> {job.location}</span>
                </div>
                <p className="text-gray-800 font-medium mb-4">{job.salary}</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span key={i} className="badge badge-accent badge-outline">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="text-center mt-10"
          >
            <button className="btn btn-primary px-8 py-3">
              View All Jobs
            </button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
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
                className="bg-gray-50 p-8 rounded-xl border border-gray-200"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h2 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-3xl font-bold mb-6"
          >
            Ready for Your Next Career Move?
          </motion.h2>
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.1 }}
            className="text-xl mb-10 opacity-90"
          >
            Join thousands of developers who found their perfect tech role through CodeRound
          </motion.p>
          <motion.button 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="btn btn-white px-10 py-4 text-lg font-semibold"
          >
            Get Started - It's Free
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;