import mongoose from "mongoose";

const ConnectMongoDB = () => {
  mongoose
    .connect(process.env.MONGO_URI as string)
    .then(() => console.log(`Connect to MongoDB`))
    .catch((e) => console.log(`ERROR:While connecting to database ${e}`));
};

export default ConnectMongoDB;
