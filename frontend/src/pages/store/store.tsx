import { atom } from "recoil";

// General Atoms
export const user_rollnumber = atom<string>({
  key: "rollNo",
  default: "",
});

export const is_authenticated = atom<boolean>({
  key: "is_authenticated",
  default: false,
});

export const generate_message = atom<boolean>({
  key: "generate_message",
  default: false,
});

export const message_status = atom<boolean>({
  key: "message_status",
  default: false,
});

export const message = atom<string>({
  key: "message",
  default: "",
});

export const email_sent = atom<boolean>({
  key: "email_sent",
  default: false,
});

// Spaces Atoms
export interface Space {
  _id: string;
  Title: string;
  Description: string;
  Venue: string;
  Subject: string;
  FromTime: Date; // Changed to Date
  ToTime: Date; // Changed to Date
  Expiry: Date; // Changed to Date
  DateCreatedOn: Date; // Changed to Date
  Creator: string;
  Users: string[];
  Joined: boolean;
  Author: string;
}

export const spaces = atom<Space[]>({
  key: "spaces",
  default: [],
});

export const joinedSpaces = atom<Space[]>({
  key: "joinedspaces",
  default: [],
});

export const CreatedSpaces = atom<Space[]>({
  key: "CreatedSpaces",
  default: [],
});

// Signup Atoms
export const signupUsername = atom<string>({
  key: "signupUsername",
  default: "",
});

export const signupEmail = atom<string>({
  key: "signupEmail",
  default: "",
});

export const signupPassword = atom<string>({
  key: "signupPassword",
  default: "",
});

// Signin Atoms
export const signinEmail = atom<string>({
  key: "signinEmail",
  default: "",
});

export const signinPassword = atom<string>({
  key: "signinPassword",
  default: "",
});

// OTP Atoms
export const otp = atom<string>({
  key: "otp",
  default: "",
});

export const otp_try_count = atom<number>({
  key: "otp_try_count",
  default: 0,
});

// Space Details Atoms
export const space_title = atom<string>({
  key: "space_title",
  default: "",
});

export const space_description = atom<string>({
  key: "space_description",
  default: "",
});

export const space_subject = atom<string>({
  key: "space_subject",
  default: "",
});

export const space_venue = atom<string>({
  key: "space_venue",
  default: "",
});

export const space_from_time = atom<Date>({
  key: "space_from_time",
  default: new Date(), // Changed to Date
});

export const space_to_time = atom<Date>({
  key: "space_to_time",
  default: new Date(), // Changed to Date
});

export const ButtonStatus = atom<string>({
  key: "ButtonStatus",
  default: "Join Spaces",
});
