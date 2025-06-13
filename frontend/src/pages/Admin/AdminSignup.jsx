import React, { useState } from 'react';
import axios from 'axios';

const AdminSignup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post('http://localhost:5000/api/admin/signup', { username, password });
      setSuccess('Admin registered successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-purple-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Signup</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <div className="mb-4">
          <label className="block mb-1">Username</label>
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="input input-bordered w-full" required />
        </div>
        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input input-bordered w-full" required />
        </div>
        <button type="submit" className="btn btn-neutral w-full">Sign Up</button>
      </form>
    </div>
  );
};

export default AdminSignup; 