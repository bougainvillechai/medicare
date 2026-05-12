import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        // This listener should be set up BEFORE you call connect
        mongoose.connection.on('connected', () => {
            console.log('Success: Connected to MongoDB');
        });

        mongoose.connection.on('error', (err) => {
            console.error('Mongoose connection error:', err);
        });

        // Simply pass the URI without the extra options object
        await mongoose.connect(process.env.MONGODB_URI);
        
        console.log("MongoDB Connection promise resolved...");
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
}

export default connectDB;