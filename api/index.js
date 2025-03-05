import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';

/**
 * Environment Configuration
 * ------------------------
 * Loads environment variables from the .env file to securely
 * manage sensitive configuration like database connection strings.
 */
dotenv.config({ path: './api/.env' });

const app = express();

/**
 * MongoDB Connection Validation
 * ------------------------
 * Ensures that the MongoDB URI is available before starting the application.
 * Exits the process with an error message if not properly configured.
 */
if (!process.env.MONGO) {
    console.error('Error: MONGO URI is undefined. Check your .env file.');
    process.exit(1);
}

/**
 * MongoDB Connection
 * ------------------------
 * Establishes a connection to the MongoDB database using Mongoose.
 * Logs the connection status to the console.
 */
mongoose.connect(process.env.MONGO)
    .then(() => console.log('Database connected successfully!'))
    .catch(err => console.error('Database connection error:', err));

/**
 * Start Express Server
 * ------------------------
 * Initializes the server on port 3000 and confirms successful startup.
 */
app.listen(3000, () => {
    console.log('Server running at port 3000!!');
});

/**
 * Route Middleware
 * ------------------------
 * Mounts the user-related routes under the /api/user path.
 * All user endpoints will be accessible through this base route.
 */
app.use("/api/user", userRouter);
