/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion } from "framer-motion";
import { BellIcon, Circle } from "lucide-react";

const dummyNotifications = [
  {
    id: 1,
    title: "Application Submitted",
    message: "Your application for Frontend Developer at CodeCraft has been submitted.",
    time: "2 hours ago",
    type: "success",
    read: false,
  },
  {
    id: 2,
    title: "Job Recommendation",
    message: "New job that matches your profile: React Developer at TechNest.",
    time: "Yesterday",
    type: "info",
    read: true,
  },
  {
    id: 3,
    title: "Interview Scheduled",
    message: "Interview with DevSolutions is scheduled for April 25 at 11:00 AM.",
    time: "3 days ago",
    type: "warning",
    read: false,
  },
  {
    id: 4,
    title: "Application Viewed",
    message: "Your application for UI/UX Designer at Designify has been viewed.",
    time: "1 week ago",
    type: "info",
    read: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const getColor = (type) => {
  switch (type) {
    case "success":
      return "bg-green-100 text-green-800";
    case "info":
      return "bg-blue-100 text-blue-800";
    case "warning":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [filter, setFilter] = useState("all");

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "read") return n.read;
    if (filter === "unread") return !n.read;
    return true;
  });

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, read: true } : n
      )
    );
  };

  return (
    <motion.div
      className="container mx-auto p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
     

      {/* Filter Buttons */}
      <div className="flex gap-3 mb-6">
        {["all", "unread", "read"].map((option) => (
          <button
            key={option}
            className={`btn btn-sm capitalize ${
              filter === option
                ? "btn-primary text-white"
                : "btn-outline"
            }`}
            onClick={() => setFilter(option)}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Notification List */}
      {filteredNotifications.length === 0 ? (
        <p className="text-gray-500">No {filter} notifications.</p>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((note) => (
            <motion.div
              key={note.id}
              variants={itemVariants}
              onClick={() => markAsRead(note.id)}
              className={`p-4 rounded-xl shadow-md border relative cursor-pointer hover:shadow-lg transition-all ${getColor(
                note.type
              )}`}
            >
              {!note.read && (
                <span className="absolute top-3 right-3">
                  <Circle className="w-3 h-3 text-blue-600 fill-blue-600" />
                </span>
              )}
              <h3 className="font-semibold text-lg">{note.title}</h3>
              <p className="text-sm">{note.message}</p>
              <span className="text-xs text-gray-500 mt-1 block">{note.time}</span>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Notifications;
