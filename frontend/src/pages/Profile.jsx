import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PersonalInfo from "../components/ProfileInfo/PersonalInfo";
import SkillsForm from '../components/ProfileInfo/SkillsForm';
import ExperienceForm from '../components/ProfileInfo/ExperienceForm ';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch('http://localhost:5000/api/profile', {
          credentials: 'include'
        });
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Update user state after edit
  const handleUserUpdate = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!user) return null;

  return (
    <div className='py-4 px-4 max-w-4xl mx-auto space-y-10'>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
      >
        <PersonalInfo user={user} onUserUpdate={handleUserUpdate} />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <SkillsForm skills={user.skills} onSkillsUpdate={skills => handleUserUpdate({ skills })} />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ExperienceForm experience={user.experience} onExperienceUpdate={experience => handleUserUpdate({ experience })} />
      </motion.div>
    </div>
  );
};

export default Profile;
