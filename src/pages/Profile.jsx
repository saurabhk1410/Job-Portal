import React from 'react';
import { motion } from 'framer-motion';
import PersonalInfo from "../components/ProfileInfo/PersonalInfo";
import SkillsForm from '../components/ProfileInfo/SkillsForm';
import ExperienceForm from '../components/ProfileInfo/ExperienceForm ';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const Profile = () => {
  return (
    <div className='py-4 px-4 max-w-4xl mx-auto space-y-10'>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
      >
        <PersonalInfo />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <SkillsForm />
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ExperienceForm />
      </motion.div>
    </div>
  );
};

export default Profile;
