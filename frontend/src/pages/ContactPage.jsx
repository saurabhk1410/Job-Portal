/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import FloatingInput from "../components/ProfileInfo/FloatingInput";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const ContactPage = () => {

  const {theme}=useTheme();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
    setFormData({ name: "", email: "", message: "" });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={fadeIn} 
      transition={{ duration: 0.5 }} 
      className="relative max-w-4xl sm:mx-auto mt-10 mx-2"
    >
      <p className={`absolute -top-3 left-6 ${theme=="light"?"bg-purple-100":"bg-base-100"} px-4 text-xl font-sans z-10`}>
        Contact Us
      </p>

      <div className="border-2 rounded-2xl p-5 sm:px-10 pb-6 font-semibold">
        <div className="max-w-5xl mx-auto mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
  {/* RIGHT: Contact Form FIRST on small devices */}
  <motion.form
    onSubmit={handleSubmit}
    variants={fadeIn}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.5, delay: 0.3 }}
    className="space-y-4 order-1 md:order-none"
  >
    <FloatingInput
      label="Your Name"
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
    />
    <FloatingInput
      label="Your Email"
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
    />

    <div className="relative w-full">
      <textarea
        name="message"
        rows="5"
        className={`${theme=="light"?"bg-purple-100":"bg-base-100"} textarea textarea-bordered w-full peer pt-6 resize-none focus:outline-0`}
        placeholder=" "
        value={formData.message}
        onChange={handleChange}
        required
      ></textarea>
      <label className="absolute left-3 top-2.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-base">
        Your Message
      </label>
    </div>

    <button className="btn btn-neutral w-full mt-2" type="submit">
      Send Message
    </button>

    {success && (
      <div className="alert alert-success shadow-sm text-sm mt-4">
        Message sent successfully!
      </div>
    )}
  </motion.form>

  {/* LEFT: Contact Info - displayed second on small screens */}
  <motion.div
    variants={fadeIn}
    initial="hidden"
    animate="visible"
    transition={{ duration: 0.5, delay: 0.2 }}
    className="space-y-6 text-base-content order-2 md:order-none"
  >
    <div className="flex items-center gap-4">
      <FaEnvelope className="text-xl" />
      <div>
        <p className="text-lg font-semibold">Email :</p>
        <p>support@coderound.com</p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <FaPhone className="text-xl " />
      <div>
        <p className="text-lg font-semibold">Phone :</p>
        <p>+91 98765 43210</p>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <FaMapMarkerAlt className="text-xl" />
      <div>
        <p className="text-lg font-semibold">Address :</p>
        <p>CodeRound HQ, Mumbai, Maharashtra, India</p>
      </div>
    </div>

    <iframe
      className="w-full h-52 rounded-lg border border-base-300"
      src="https://maps.google.com/maps?q=Mumbai,%20India&t=&z=13&ie=UTF8&iwloc=&output=embed"
      allowFullScreen
      loading="lazy"
    ></iframe>
  </motion.div>
</div>

        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;
