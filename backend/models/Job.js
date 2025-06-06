import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    jobRole: { type: String, required: true },
    location: { type: String, required: true },
    workMode: { type: String, enum: ['Onsite', 'Remote'], required: true },
    employmentType: { type: String, enum: ['Full-time', 'Part-time'], required: true },
    skills: [{ type: String, required: true }],
    minExperience: { type: Number, required: true },
    salaryRange: { type: String, required: true }, // e.g., "9-13 LPA"
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    createdAt: { type: Date, default: Date.now }
});

const Job = mongoose.model('Job', jobSchema);
export default Job; 