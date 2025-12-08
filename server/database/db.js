import mongoose from "mongoose";

export const connectDB = () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI is not defined in .env");
    process.exit(1); // Stop the app
  }

  mongoose.connect(uri, {
    dbName: 'MERN_STACK_LIBRARY_MANAGEMENT_SYSTEM'
  })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.log('Error connecting to database', err));
}
