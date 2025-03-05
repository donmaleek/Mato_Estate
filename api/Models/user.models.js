import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * User Schema Definition
 * ------------------------
 * This schema models the core user data for authentication and profile purposes.
 * It enforces validation for critical fields like name, email, and password.
 * Mongoose's timestamps option tracks account creation and updates.
 */
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please enter a valid email address',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        profilePicture: {
            type: String,
            default: 'default-profile.png',
        },
        description: {
            type: String,
            maxlength: [500, 'Description cannot exceed 500 characters'],
        },
    },
    { timestamps: true }
);

/**
 * Pre-save Hook
 * ------------------------
 * Automatically hashes the user's password before saving it to the database.
 * Ensures passwords are never stored in plaintext.
 * This runs only if the password field has been modified.
 */
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

/**
 * Password Verification Method
 * ------------------------
 * Compares a plain text password with the hashed password stored in the database.
 * Used during login to authenticate the user.
 */
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

/**
 * Model Export
 * ------------------------
 * Compiles the schema into a Mongoose model, making it available for use
 * throughout the application when interacting with user data.
 */
const User = mongoose.model('User', userSchema);

export default User;
