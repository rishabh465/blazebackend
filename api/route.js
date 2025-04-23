import app from './index.js';

export default async function handler(req, res) {
    // Log environment variables (excluding sensitive data)
    console.log('Environment check:', {
        NODE_ENV: process.env.NODE_ENV,
        MONGODB_URI: process.env.MONGODB_URI ? 'exists' : 'missing',
        FRONTEND_URL: process.env.FRONTEND_URL
    });

    // Check for required environment variables
    if (!process.env.MONGODB_URI) {
        console.error('MONGODB_URI is not defined in environment variables');
        return res.status(500).json({ 
            error: 'Server Configuration Error',
            message: 'Database connection string is not configured'
        });
    }

    // Connect to MongoDB
    try {
        const mongoose = (await import('mongoose')).default;
        console.log('Attempting to connect to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        return res.status(500).json({ 
            error: 'Database Connection Error',
            message: error.message
        });
    }

    // Handle the request
    return app(req, res);
} 