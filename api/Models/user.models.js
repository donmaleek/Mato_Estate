import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Define the User schema
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'], // Name is mandatory
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'], // Email is mandatory
            unique: true, // Ensures no duplicate emails
            trim: true,
            lowercase: true, // Stores email in lowercase
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please enter a valid email address',
            ], // Validates email format
        },
        password: {
            type: String,
            required: [true, 'Password is required'], // Password is mandatory
            minlength: [6, 'Password must be at least 6 characters long'], // Enforces password length
        },
        profilePicture: {
            type: String, // Stores profile picture URL
            default: 'default-profile.png', // Default profile picture
        },
        description: {
            type: String, // Short user bio or company description
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
        isAdmin: {
            type: Boolean,
            default: false, // Default role is a normal user
        },
    },
    { timestamps: true } // Adds createdAt and updatedAt fields automatically
);

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // Only hash if the password is modified

    try {
        const salt = await bcrypt.genSalt(10); // Generate salt with 10 rounds
        this.password = await bcrypt.hash(this.password, salt); // Hash password
        next();
    } catch (error) {
        next(error);
    }
});

// Method to compare passwords during login
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the User model
const User = mongoose.model('User', userSchema);

export default User;

