import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // Connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        // Log notification upon successful connection
        console.log("Đã kết nối thành công với MongoDB");
    } catch (error) {
        // Log errors and exit the process if the connection fails
        console.log(`Lỗi kết nối với MongoDB: ${error.message}`);
        process.exit(1);
    }
};
