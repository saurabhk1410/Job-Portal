/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { FiTarget, FiUsers, FiZap, FiCode, FiAward } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
const AboutPage = ({colormode}) => {
  const {theme}=useTheme();
 console.log(colormode);
 
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    { icon: <FiZap className="text-2xl" />, title: "Real-time Job Filtering", desc: "Filter by type, location, skills and more" },
    { icon: <FiCode className="text-2xl" />, title: "Clean UI", desc: "User-friendly interface that adapts to any device" },
    { icon: <FiAward className="text-2xl" />, title: "Diverse Opportunities", desc: "Jobs and internships (remote & onsite)" },
    { icon: <FiZap className="text-2xl" />, title: "Quick Apply", desc: "One-click apply redirection" }
  ];

  return (
<div className={`max-w-5xl mx-auto px-4 sm:px-6 py-12 `}>
{/* Hero */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          About CodeRound
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          CodeRound is a modern job portal crafted <span className="font-semibold text-gray-800">for developers, by a developer</span> — to simplify the journey of finding opportunities that truly match your skills and goals.
        </p>
      </motion.section>

      {/* Mission Section */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-16 bg-blue-50 rounded-xl p-8"
      >
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
            <FiTarget className="text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">Our Mission</h2>
            <p className="text-gray-600">
              We aim to bridge the gap between talented individuals and meaningful tech opportunities.
              Whether you're a student, an experienced developer, or a company looking to hire — CodeRound provides a curated platform to connect the right people at the right time.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Who We Help */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3  rounded-lg text-purple-600">
            <FiUsers className="text-2xl" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 pt-1">Who We Help</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2 text-gray-800">👩‍💻 Job Seekers</h3>
            <p className="text-gray-600">Discover full-time and part-time opportunities that match your skills</p>
          </div>
          <div className=" p-6 rounded-xl border hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2 text-gray-800">🎓 Interns</h3>
            <p className="text-gray-600">Find remote/on-site internships with verified companies</p>
          </div>
          <div className=" p-6 rounded-xl border hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2 text-gray-800">🏢 Employers</h3>
            <p className="text-gray-600">Reach passionate and skilled developers with ease</p>
          </div>
        </div>
      </motion.section>

      {/* Features */}
      <motion.section 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-semibold mb-8 text-center text-gray-800">Our Features</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className=" p-6 rounded-xl  border  hover:shadow-md transition-shadow flex flex-col items-center text-center"
            >
              <div className="p-3 bg-indigo-100 rounded-lg text-indigo-600 mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

    {/* Founder */}
<motion.section 
  initial="hidden"
  animate="visible"
  variants={fadeIn}
  transition={{ duration: 0.6, delay: 0.4 }}
  className="mb-16 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-8"
>
  <div className="flex flex-col md:flex-row gap-8 items-center">
    <div className="flex-shrink-0 flex gap-4">
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-100">
        <img 
          src="https://avatars.githubusercontent.com/u/138638288?v=4" 
          alt="Saurabh Sharma"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-indigo-100">
        <img 
          src="https://avatars.githubusercontent.com/u/160416508?s=400&u=27907b40860779ce107e78e82fb553e9ea3b22a6&v=4" 
          alt="Tanay Shah"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Built by Developers</h2>
      <p className="text-gray-600 mb-4">
        CodeRound was created as part of a frontend hiring challenge — but the goal was never just to pass a test. It was to create a platform that's intuitive, accessible, and actually helpful.
      </p>
      <p className="text-gray-600">
        Crafted with React, Tailwind, and lots of love by <span className="font-semibold text-indigo-600">Saurabh Sharma <span className="text-gray-600">&</span> Tanay Shah</span>.
      </p>
    </div>
  </div>
</motion.section>

      {/* Footer Note */}
      <motion.footer
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="text-center text-sm text-gray-500 mt-12"
      >
        © {new Date().getFullYear()} CodeRound. All rights reserved.
      </motion.footer>
    </div>
  );
};

export default AboutPage;