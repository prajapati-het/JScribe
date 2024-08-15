import mongoose from "mongoose"
export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "wd-complier",
    });
    console.log("connection established!");
  } catch (error) {
    console.log("error connecting to database");
  }
};
