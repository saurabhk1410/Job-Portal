import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import JobListings from "./pages/JobListings";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import { useTheme } from "./context/ThemeContext";
import SavedJobs from "./pages/SavedJobs";

const App = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Router>
      <div
className={`min-h-screen pt-24 ${theme === "light" ? "bg-purple-200" : "bg-base-100"}`}>
<Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/savedjobs" element={<SavedJobs />} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
