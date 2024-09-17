import mongoose from "mongoose";
export default () =>
  new Promise((resolve, reject) => {
    const URI =
      process.env.NODE_ENV === "development"
        ? process.env.MONGO_LOCAL_URI
        : process.env.MONGO_CLOUD_URI;
    mongoose
      .connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      })
      .then(() => {
        console.log(`MongoDb connection successful: ${process.env.NODE_ENV}`);
        resolve();
      })
      .catch(reject);
  });
