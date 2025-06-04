import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    sapId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    linkedIn: {
        type: String,
        trim: true
    },
    resumeUrl: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    skills: {
        type: [
            {
                name: { type: String, required: true },
                rating: { type: Number, required: true, min: 1, max: 5 }
            }
        ],
        default: []
    },
    experience: {
        type: [
            {
                company: { type: String, required: true },
                location: { type: String, required: true },
                mode: { type: String, enum: ['Offline', 'Online', 'Hybrid'], required: true },
                type: { type: String, enum: ['Internship', 'Job'], required: true },
                role: { type: String, required: true },
                from: { type: Date, required: true },
                to: { type: Date, required: true },
                salary: { type: Number, required: true }
            }
        ],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User; 