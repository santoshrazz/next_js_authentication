import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    const connectionInstance = mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log(`Database connected successfully`);
    });
    connection.on("error", () => {
      process.exit(1);
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};
