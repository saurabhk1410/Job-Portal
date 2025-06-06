import React, { useEffect, useState } from 'react';
import axios from 'axios';

const initialJob = {
  companyName: '',
  jobRole: '',
  location: '',
  workMode: 'Onsite',
  employmentType: 'Full-time',
  skills: '', // comma separated
  minExperience: '',
  salaryRange: '',
};

const AdminDashboard = () => {
  const [job, setJob] = useState(initialJob);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin/jobs', { withCredentials: true });
      setJobs(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setJobs([]);
      setError('Failed to fetch jobs');
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const payload = {
        ...job,
        skills: job.skills.split(',').map(s => s.trim()),
        minExperience: Number(job.minExperience),
      };
      await axios.post('http://localhost:5000/api/admin/jobs', payload, { withCredentials: true });
      setSuccess('Job added successfully!');
      setJob(initialJob);
      fetchJobs();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add job');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8 max-w-xl">
        <h3 className="text-xl font-semibold mb-4">Add New Job</h3>
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {success && <div className="text-green-500 mb-2">{success}</div>}
        <div className="grid grid-cols-2 gap-4">
          <input name="companyName" value={job.companyName} onChange={handleChange} placeholder="Company Name" className="input input-bordered col-span-2" required />
          <input name="jobRole" value={job.jobRole} onChange={handleChange} placeholder="Job Role" className="input input-bordered col-span-2" required />
          <input name="location" value={job.location} onChange={handleChange} placeholder="Location" className="input input-bordered col-span-2" required />
          <select name="workMode" value={job.workMode} onChange={handleChange} className="select select-bordered" required>
            <option value="Onsite">Onsite</option>
            <option value="Remote">Remote</option>
          </select>
          <select name="employmentType" value={job.employmentType} onChange={handleChange} className="select select-bordered" required>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
          </select>
          <input name="skills" value={job.skills} onChange={handleChange} placeholder="Skills (comma separated)" className="input input-bordered col-span-2" required />
          <input name="minExperience" value={job.minExperience} onChange={handleChange} placeholder="Min Experience (years)" type="number" min="0" className="input input-bordered" required />
          <input name="salaryRange" value={job.salaryRange} onChange={handleChange} placeholder="Salary Range (e.g. 9-13 LPA)" className="input input-bordered" required />
        </div>
        <button type="submit" className="btn btn-neutral mt-4 w-full">Add Job</button>
      </form>

      <h3 className="text-2xl font-semibold mb-4">All Jobs & Applicants</h3>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Location</th>
              <th>Work Mode</th>
              <th>Type</th>
              <th>Skills</th>
              <th>Min Exp</th>
              <th>Salary</th>
              <th>Applicants</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(jobs) && jobs.length > 0 ? (
              jobs.map(job => (
                <tr key={job._id}>
                  <td>{job.companyName}</td>
                  <td>{job.jobRole}</td>
                  <td>{job.location}</td>
                  <td>{job.workMode}</td>
                  <td>{job.employmentType}</td>
                  <td>{job.skills.join(', ')}</td>
                  <td>{job.minExperience}</td>
                  <td>{job.salaryRange}</td>
                  <td>
                    {job.applicants && job.applicants.length > 0 ? (
                      <table className="table table-xs">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Location</th>
                            <th>Resume</th>
                          </tr>
                        </thead>
                        <tbody>
                          {job.applicants.map(user => (
                            <tr key={user._id}>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td>{user.location}</td>
                              <td>
                                {user.resumeUrl ? (
                                  <a href={user.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                                    View Resume
                                  </a>
                                ) : (
                                  <span className="text-gray-400">N/A</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <span>No applicants</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="9" className="text-center">No jobs found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard; 