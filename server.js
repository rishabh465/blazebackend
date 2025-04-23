import dotenv from 'dotenv';
import connectMongoDB from './db/connectMongoDB.js';
import app from './api/index.js';
import { v2 as cloudinary } from 'cloudinary';

// Load environment variables
dotenv.config();
console.log('Environment: ', process.env.NODE_ENV);
console.log('Port: ', process.env.PORT);
console.log('MongoDB URI: ', process.env.MONGO_URI ? 'URI is set' : 'URI is not set');
console.log('Cloudinary config: ', 
  process.env.CLOUDINARY_CLOUD_NAME ? 'Cloud name is set' : 'Cloud name is not set',
  process.env.CLOUDINARY_API_KEY ? 'API key is set' : 'API key is not set',
  process.env.CLOUDINARY_API_SECRET ? 'API secret is set' : 'API secret is not set'
);

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Connect to MongoDB
try {
  await connectMongoDB();
  console.log('MongoDB connection successful');
} catch (error) {
  console.error('MongoDB connection error:', error);
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT} in ${process.env.NODE_ENV} mode`);
}); 