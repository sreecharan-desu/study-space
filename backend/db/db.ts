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


const filterSpaces = async () => {
  try {
    const spaces = await Spaces.find({ isExpired: false });

    // Get current time in UTC
    const nowUtc = new Date();

    let expiredSpacesCount = 0;

    for (const space of spaces) {
      // Space end time in UTC
      const spaceEndTimeUtc = new Date(space.ToTime);

      console.log(`Current time (UTC): ${nowUtc.toISOString()}`);
      console.log(`Space end time (UTC): ${spaceEndTimeUtc.toISOString()}`);

      // Check if the space has expired
      if (nowUtc > spaceEndTimeUtc) {
        console.log(`Space ${space._id} has expired.`);
        expiredSpacesCount++;

        // Update the space's isExpired status
        await Spaces.updateOne({ _id: space._id }, { isExpired: true });
        console.log(`Space ${space._id} marked as expired.`);
      } else {
        console.log(`Space ${space._id} has not expired yet.`);
      }
    }

    console.log(
      `${expiredSpacesCount} spaces have expired at ${new Date().toISOString()}.`
    );
  } catch (error) {
    console.error("Error filtering spaces:", error);
  }
};

// Run the function to test
filterSpaces();

// Schedule the job to run every 5 seconds
setInterval(filterSpaces, 5000); // 5000 milliseconds = 5 seconds
