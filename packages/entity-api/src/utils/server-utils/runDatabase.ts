/* eslint-disable no-undef */
import mongoose from "mongoose";

export default async () => {
  const URI =
    process.env.NODE_ENV === "development"
      ? process.env.MONGO_LOCAL_URI
      : process.env.MONGO_CLOUD_URI;
  try {
    if (URI) {
      await mongoose.connect(URI);
      console.log(`MongoDb connection successful!`);
    } else throw new Error("DB Connection URI does not found!");
  } catch (error: any) {
    console.log(error);
    throw new Error(error.message);
  }
};
