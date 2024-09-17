import mongoose from "mongoose";

async function connectToDatabase() {
  const PRODUCTION_URI = "mongodb://mongodb_service:27017/app";
  const DEVELOPMENT_URI = "mongodb://localhost:27017/executor";
  const URI =
    process.env.NODE_ENV === "development" ? DEVELOPMENT_URI : PRODUCTION_URI;

  try {
    await mongoose.connect(DEVELOPMENT_URI);
    console.log(`MongoDb connection successful!`);
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
}
export default connectToDatabase;
