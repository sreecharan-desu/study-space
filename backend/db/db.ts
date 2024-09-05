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
  isExpired: { type: Boolean, default: false }, // Changed to Mongoose Boolean type
});


export const Users = mongoose.model("User", UserSchema);
export const Spaces = mongoose.model("Space", SpacesSchema);


const convertToIST = (utcDate: Date) => {
  return new Date(utcDate.getTime() + (5 * 60 + 30) * 60000); // Add 5 hours 30 minutes in milliseconds
};

const filterSpaces = async () => {
  try {
    const spaces = await Spaces.find({ isExpired: false });

    // Get current time in UTC and IST
    const nowUtc = new Date();
    const nowIst = convertToIST(nowUtc);

    let expiredSpacesCount = 0;
    const expiredSpaceIds: string[] = [];

    for (const space of spaces) {
      // Space end time in UTC

      const spaceEndTimeUtc = new Date(space.ToTime);

      console.log(`Current time (UTC): ${nowUtc.toISOString()}`);
      console.log(`Current time (IST): ${nowIst.toISOString()}`);
      console.log(`Space end time (UTC): ${spaceEndTimeUtc.toISOString()}`);

      // Check if the space has expired in UTC
      if (nowIst > spaceEndTimeUtc) {
        console.log(`Space ${space._id} has expired.`);
        expiredSpacesCount++;

        // Add space ID to array for bulk update (convert ObjectId to string)
        expiredSpaceIds.push(space._id.toString());
      } else {
        console.log(`Space ${space._id} has not expired yet.`);
      }
    }

    // Bulk update all expired spaces
    if (expiredSpaceIds.length > 0) {
      await Spaces.updateMany(
        { _id: { $in: expiredSpaceIds } },
        { $set: { isExpired: true } }
      );
      console.log(`${expiredSpacesCount} spaces marked as expired.`);
    } else {
      console.log("No spaces expired at this time.");
    }

    console.log(
      `${expiredSpacesCount} spaces have expired at ${nowUtc.toISOString()} (UTC) / ${nowIst.toISOString()} (IST).`
    );
  } catch (error) {
    console.error("Error filtering spaces:", error);
  }
};

// Run the function every 5 seconds
setInterval(filterSpaces, 5000);
