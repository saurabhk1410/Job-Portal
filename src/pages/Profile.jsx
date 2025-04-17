import React from 'react'
import PersonalInfo from "../components/ProfileInfo/PersonalInfo"
import SkillsForm from '../components/ProfileInfo/SkillsForm'
import ExperienceForm from '../components/ProfileInfo/ExperienceForm '
const Profile = () => {
  return (
    <div className='py-4'>
        <PersonalInfo/>
        <SkillsForm/>
        <ExperienceForm/>
    </div>

  )
}

export default Profile