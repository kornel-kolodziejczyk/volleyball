import mongoose from "mongoose";

const MONGODB_URI = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.kkp0a.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Connected already");
    return;
  }

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB", mongoose.connections.length);
  });

  mongoose.connection.on("error", (error) => {
    console.log("MongoDb connection error", error);
  });

  return await mongoose.connect(MONGODB_URI);
};

export default dbConnect;
