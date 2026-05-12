import mongoose from 'mongoose';
import 'dotenv/config';

const testConnection = async () => {
    const uri = process.env.MONGODB_URI;
    
    if (!uri) {
        console.error("❌ Error: MONGODB_URI is not defined in your .env file.");
        process.exit(1);
    }

    console.log('Connecting to MongoDB...');
    try {
        await mongoose.connect(uri);
        console.log('✅ Success! Connected to MongoDB cluster.');
        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection failed:', error.message);
        process.exit(1);
    }
};

testConnection();