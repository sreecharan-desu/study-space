import mongoose from "mongoose";
import schedule from "node-schedule";
import dotenv from "dotenv";
dotenv.config();

const mongoUri: string = process.env.MONGO_URI as string;
mongoose.connect(mongoUri);

//UsersSchema
const UserSchema = new mongoose.Schema({
  Username: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  SpacesCreated: { type: [mongoose.Schema.ObjectId], default: [] }, // Defining the type of elements in the array
  SpacesJoined: { type: [mongoose.Schema.ObjectId], default: [] }, // Defining the type of elements in the array
  SecurityCode: { type: String, required: true },
});

const SpacesSchema = new mongoose.Schema({
  Title: { type: String, default: "Chilling Session", required: true },
  Description: { type: String, default: "Shorter description", required: true },
  Venue: { type: String, default: "Seminar hall", required: true },
  Subject: { type: String, default: "Seminar hall", required: true },
  FromTime: { type: Date, default: () => new Date() },
  ToTime: {
    type: Date,
    default: () => new Date(new Date().getTime() + 60 * 60000),
  }, // Default to 60 minutes later
  Expiry: {
    type: Date,
    default: () => new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  }, // Default to 1 day
  DateCreatedOn: { type: Date, default: () => new Date() },
  Creator: { type: mongoose.Schema.ObjectId },
  Users: { type: [mongoose.Schema.ObjectId], default: [] }, // Defining the type of elements in the array
  Author: String,
});

export const Users = mongoose.model("User", UserSchema);
export const Spaces = mongoose.model("Space", SpacesSchema);

// Scheduling a job to run daily at midnight to remove expired spaces
schedule.scheduleJob("0 0 * * *", async function () {
  const now = new Date();
  try {
    const result = await Spaces.deleteMany({ Expiry: { $lt: now } });
    console.log(`Removed ${result.deletedCount} expired spaces.`);
  } catch (error) {
    console.error("Error removing expired spaces:", error);
    try {
      console.log(`Error removing spaces first time retrying the process...`);
      const result = await Spaces.deleteMany({ Expiry: { $lt: now } });
      console.log(`Removed ${result.deletedCount} expired spaces.`);
    } catch (e) {
      console.log(
        `Error removing spaces second time and stopping the process...`
      );
    }
  }
});
