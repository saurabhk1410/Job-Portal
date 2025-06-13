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
  const [expandedJob, setExpandedJob] = useState(null);

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

  const toggleApplicants = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  return (
    <div className="p-4 md:p-8 bg-purple-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>
        
        {/* Add Job Form */}
        <div className="border-2 rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Add New Job</h3>
          {error && <div className="alert alert-error mb-4">{error}</div>}
          {success && <div className="alert alert-success mb-4">{success}</div>}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Company Name</span>
                </label>
                <input 
                  name="companyName" 
                  value={job.companyName} 
                  onChange={handleChange} 
                  placeholder="e.g. Google" 
                  className="input input-bordered w-full" 
                  required 
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Job Role</span>
                </label>
                <input 
                  name="jobRole" 
                  value={job.jobRole} 
                  onChange={handleChange} 
                  placeholder="e.g. Frontend Developer" 
                  className="input input-bordered w-full" 
                  required 
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Location</span>
                </label>
                <input 
                  name="location" 
                  value={job.location} 
                  onChange={handleChange} 
                  placeholder="e.g. Bangalore, India" 
                  className="input input-bordered w-full" 
                  required 
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Work Mode</span>
                </label>
                <select 
                  name="workMode" 
                  value={job.workMode} 
                  onChange={handleChange} 
                  className="select select-bordered w-full" 
                  required
                >
                  <option value="Onsite">Onsite</option>
                  <option value="Remote">Remote</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Employment Type</span>
                </label>
                <select 
                  name="employmentType" 
                  value={job.employmentType} 
                  onChange={handleChange} 
                  className="select select-bordered w-full" 
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Skills (comma separated)</span>
                </label>
                <input 
                  name="skills" 
                  value={job.skills} 
                  onChange={handleChange} 
                  placeholder="e.g. React, JavaScript, CSS" 
                  className="input input-bordered w-full" 
                  required 
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Min Experience (years)</span>
                </label>
                <input 
                  name="minExperience" 
                  value={job.minExperience} 
                  onChange={handleChange} 
                  placeholder="e.g. 2" 
                  type="number" 
                  min="0" 
                  className="input input-bordered w-full" 
                  required 
                />
              </div>
              
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Salary Range</span>
                </label>
                <input 
                  name="salaryRange" 
                  value={job.salaryRange} 
                  onChange={handleChange} 
                  placeholder="e.g. 9-13 LPA" 
                  className="input input-bordered w-full" 
                  required 
                />
              </div>
            </div>
            
            <button type="submit" className="btn btn-neutral mt-4 w-full md:w-auto">
              Add Job
            </button>
          </form>
        </div>

        {/* Jobs List */}
        <div className=" rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">All Jobs & Applicants</h3>
          
          {Array.isArray(jobs) && jobs.length > 0 ? (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div key={job._id} className="border rounded-lg overflow-hidden">
                  <div 
                    className="p-4 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                    onClick={() => toggleApplicants(job._id)}
                  >
                    <div>
                      <h4 className="font-bold text-lg">{job.jobRole}</h4>
                      <p className="text-gray-600">{job.companyName} • {job.location}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="badge badge-outline">{job.workMode}</span>
                        <span className="badge badge-outline">{job.employmentType}</span>
                        <span className="badge badge-outline">{job.minExperience}+ years</span>
                        <span className="badge badge-outline">{job.salaryRange}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className={`badge ${job.applicants?.length ? 'badge-success' : 'badge-neutral'}`}>
                        {job.applicants?.length || 0} applicants
                      </span>
                      <svg 
                        className={`w-5 h-5 ml-2 transition-transform ${expandedJob === job._id ? 'rotate-180' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  {expandedJob === job._id && (
                    <div className="border-t p-4 bg-gray-50">
                      <h5 className="font-semibold mb-3">Applicants ({job.applicants?.length || 0})</h5>
                      
                      {job.applicants?.length ? (
                        <div className="overflow-x-auto">
                          <table className="table table-zebra w-full">
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
                                  <td>{user.location || 'N/A'}</td>
                                  <td>
                                    {user.resumeUrl ? (
                                      <a 
                                        href={user.resumeUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="link link-primary"
                                      >
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
                        </div>
                      ) : (
                        <div className="text-center py-4 text-gray-500">
                          No applicants yet
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No jobs found. Add your first job posting above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;