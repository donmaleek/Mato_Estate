import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './api/.env' });

const app = express();

// Ensure MONGO URI is defined
if (!process.env.MONGO) {
    console.error('Error: MONGO URI is undefined. Check your .env file.');
    process.exit(1);
}

// Connect to MongoDB (Remove deprecated options)
mongoose.connect(process.env.MONGO)
    .then(() => console.log('Database connected successfully!'))
    .catch(err => console.error('Database connection error:', err));

app.listen(3000, () => {
    console.log('Server running at port 3000!!');
});
