import { Router, Request, Response } from "express";
import {
  CheckIfUserPresent,
  sendEmailToUser,
  userSignupForminputValidation,
  verifySecurityCode,
} from "./middlewares/signUpAuthHelpers";
import { Spaces, Users } from "../../db/db";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import {
  fetchUser,
  generateJWT,
  validateSigninForm,
} from "./middlewares/signInAuthHelpers";
import {
  authMiddleware,
  getUserIdByEmail,
  getUsernameByEmail,
} from "./middlewares/authMiddleware";

export const userRoute: Router = Router();

export const getEmailFromToken = (authorization: string): string => {
  const token = authorization.split(" ")[1];
  if (!process.env.JWT_KEY) {
    throw new Error("Fatal: Missing JWT_KEY in environment variables");
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY) as string;
    return decodedToken;
  } catch (e) {
    console.log("Error while extracting email:", e);
    throw new Error("Invalid or expired token");
  }
};

// Signup Route
userRoute.post(
  "/signup",
  userSignupForminputValidation,
  CheckIfUserPresent,
  async (req: Request, res: Response) => {
    const { username, password, email } = req.body;
    try {
      const emailStatus = await sendEmailToUser(email, username);
      if (emailStatus.success) {
        const saltRounds = 10; // Use more rounds for better security
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await Users.create({
          Username: username,
          Password: hashedPassword,
          Email: email,
          SecurityCode: emailStatus.securityCode?.toString(),
        });
        res
          .status(201)
          .json({ msg: emailStatus.msg, success: emailStatus.success });
      } else {
        res
          .status(400)
          .json({ msg: emailStatus.msg, success: emailStatus.success });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
  }
);

// Verify Security Code Route
userRoute.post("/verifysecuritycode", async (req: Request, res: Response) => {
  const { email, securitycode } = req.body;
  try {
    const verification = await verifySecurityCode(email, securitycode);
    if (verification.success) {
      res.json({
        msg: "Account created successfully! Sign in now!",
        success: true,
      });
    } else {
      await Users.deleteOne({ Email: email });
      res.json({
        msg: "Invalid Security Code! Please sign up again.",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error verifying security code:", error);
    res.status(500).json({ msg: "Internal server error", success: false });
  }
});

userRoute.post(
  "/signin",
  validateSigninForm,
  fetchUser,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const JWT_KEY = await generateJWT(email);
      res.json({
        token: JWT_KEY,
        success: true,
      });
    } catch (error) {
      console.error("Error during signin:", error);
      res.status(500).json({ msg: "Internal server error", success: false });
    }
  }
);

userRoute.get(
  "/getusername",
  authMiddleware,
  async (req: Request, res: Response) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        msg: "Fatal: Missing Authorization header",
      });
    }
    try {
      const email = await getEmailFromToken(authorization);
      if (email) {
        const username = await getUsernameByEmail(email);
        res.json({
          username,
          success: true,
        });
      } else {
        res.status(401).json({
          msg: "Invalid token",
          success: false,
        });
      }
    } catch (error) {
      console.error("Error getting username:", error);
      res.status(500).json({ msg: "Internal server error", success: false });
    }
  }
);

userRoute.get(
  "/getspaces",
  authMiddleware,
  async (req: Request, res: Response) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        msg: "Fatal: Missing Authorization header",
      });
    }
    try {
      const email = await getEmailFromToken(authorization);
      const user_Id = await getUserIdByEmail(email);
      const spaces = await Spaces.find({
        Users: { $ne: user_Id },
      });

      res.json({
        spaces,
        success: true,
      });
    } catch (error) {
      console.error("Error getting spaces:", error);
      res.status(500).json({ msg: "Internal server error", success: false });
    }
  }
);

userRoute.get("/noauthgetspaces", async (req: Request, res: Response) => {
  try {
    const spaces = await Spaces.find();
    res.json({
      spaces,
      success: true,
    });
  } catch (error) {
    console.error("Error getting spaces:", error);
    res.status(500).json({ msg: "Internal server error", success: false });
  }
});

userRoute.post(
  "/addspace",
  authMiddleware,
  async (req: Request, res: Response) => {
    const {
      title,
      description,
      subject,
      venue,
      from_time,
      to_time,
      date_created,
      expiry,
    } = req.body;

    // console.log();

    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        msg: "Fatal: Missing Authorization header",
      });
    }

    try {
      const email = await getEmailFromToken(authorization);
      const user_Id = await getUserIdByEmail(email);
      // Get today's date to use with the time values
      const today = new Date();
      const baseDate = today.toISOString().split("T")[0]; // 'YYYY-MM-DD' format

      // Combine the date with the time strings
      const fromTime = new Date(`${baseDate}T${from_time}:00Z`);
      const toTime = new Date(`${baseDate}T${to_time}:00Z`);

      // Validate the created Date objects
      if (isNaN(fromTime.getTime()) || isNaN(toTime.getTime())) {
        return res.status(400).json({
          msg: `Invalid time provided, ${email}`,
        });
      }

      const space = await Spaces.create({
        Title: title,
        Description: description,
        Venue: venue,
        Subject: subject,
        FromTime: fromTime,
        ToTime: toTime,
        Creator: user_Id,
        Users: [],
      });

      // Update the user with the created space
      await Users.updateOne(
        { _id: user_Id },
        {
          $push: { SpacesCreated: space._id },
        }
      );

      res.json({
        msg: `Space with id : ${space._id} is created!`,
        success: true,
      });
    } catch (error) {
      console.error("Error creating space:" + error);
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  }
);

userRoute.post(
  "/joinspace",
  authMiddleware,
  async (req: Request, res: Response) => {
    const { space_id } = req.body;
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({
        msg: "Fatal: Missing Authorization header",
      });
    }

    try {
      const email = await getEmailFromToken(authorization);
      if (!email) {
        return res.status(401).json({
          msg: "Invalid or expired token",
        });
      }

      const user_Id = await getUserIdByEmail(email);
      if (!user_Id) {
        return res.status(404).json({
          msg: "User not found",
        });
      }

      // Find the space by ID
      const space = await Spaces.findById(space_id);
      if (!space) {
        return res.status(404).json({
          msg: "Invalid space; it may have been moved or deleted by the creator!",
        });
      }

      // Check if the user is already in the space
      if (space.Users.includes(user_Id)) {
        return res.status(400).json({
          msg: "You are already a member of this space.",
        });
      }

      // Update the space to add the user
      space.Users.push(user_Id);
      await space.save();

      await Users.updateOne(
        { _id: user_Id },
        {
          $push: { SpacesJoined: space._id },
        }
      );

      res.json({
        msg: `Successfully joined the space ${space.Title}`,
        success: true,
      });
    } catch (error) {
      console.error("Error joining space:", error);
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  }
);

userRoute.get(
  "/spacesjoined",
  authMiddleware,
  async (req: Request, res: Response) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        msg: "Fatal: Missing Authorization header",
      });
    }
    try {
      const email = await getEmailFromToken(authorization);
      const user_Id = await getUserIdByEmail(email);

      const user = await Users.findOne({
        _id: user_Id,
      });

      if (!user) {
        return res.status(404).json({
          msg: "User doesn't exist",
        });
      }

      const spaces = user.SpacesJoined;

      // Use Promise.all to handle the array of promises
      const spaceDetails = await Promise.all(
        spaces.map(async (spaceId) => {
          return await Spaces.findById(spaceId);
        })
      );

      res.json({
        spaceDetails,
        success: true,
      });
    } catch (error) {
      console.error("Error getting spaces joined:", error);
      res.status(500).json({ msg: "Internal server error", success: false });
    }
  }
);

userRoute.get(
  "/spacescreated",
  authMiddleware,
  async (req: Request, res: Response) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({
        msg: "Fatal: Missing Authorization header",
      });
    }
    try {
      const email = await getEmailFromToken(authorization);
      const user_Id = await getUserIdByEmail(email);

      const user = await Users.findOne({
        _id: user_Id,
      });

      if (!user) {
        return res.status(404).json({
          msg: "User doesn't exist",
        });
      }

      const spaces = user.SpacesCreated;

      // Use Promise.all to handle the array of promises
      const spaceDetails = await Promise.all(
        spaces.map(async (spaceId) => {
          return await Spaces.findById(spaceId);
        })
      );

      res.json({
        spaceDetails,
        success: true,
      });
    } catch (error) {
      console.error("Error getting spaces created:", error);
      res.status(500).json({ msg: "Internal server error", success: false });
    }
  }
);
