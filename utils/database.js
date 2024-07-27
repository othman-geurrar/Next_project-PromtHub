import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if(isConnected) {
        console.log('DB connection already established.');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });
        console.log('MongoDB connected...');
        isConnected = true;
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        
    }

    
};