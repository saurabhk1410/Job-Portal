import React, { useState } from "react";
import FloatingInput from "../components/ProfileInfo/FloatingInput"; // Adjust the path if needed
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage = () => {
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

  return (
<div className="relative max-w-4xl mx-auto mt-10">
  <p className="absolute -top-3 left-6 bg-base-100 px-4 text-xl font-sans z-10">
    Contact Us
  </p>

  <div className="border-2 rounded-2xl px-10 pb-6 font-semibold bg-base-100">
    {/* contact content here */}
    <div className="max-w-5xl mx-auto mt-10">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16">
          {/* Left Column: Contact Info */}
          <div className="space-y-6 text-base-content">
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
          </div>

          {/* Right Column: Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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
            {/* Custom textarea styling to match FloatingInput look */}
            <div className="relative w-full">
              <textarea
                name="message"
                rows="5"
                className="textarea textarea-bordered w-full peer pt-6 resize-none"
                placeholder=" "
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
              <label className="absolute left-3 top-2.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:top-2.5 peer-focus:text-sm peer-focus:text-primary">
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
          </form>
        </div>
      
    </div>
  </div>
</div>




  
  );
};

export default ContactPage;
