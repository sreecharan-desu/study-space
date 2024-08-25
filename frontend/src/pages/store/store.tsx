import { atom } from "recoil";

// General Atoms
export const user_rollnumber = atom({
  key: "rollNo",
  default: "",
});

export const is_authenticated = atom({
  key: "is_authenticated",
  default: false,
});

export const generate_message = atom({
  key: "generate_message",
  default: false,
});

export const message_status = atom({
  key: "message_status",
  default: false,
});

export const message = atom({
  key: "message",
  default: "",
});

export const email_sent = atom({
  key: "email_sent",
  default: false,
});

// Spaces Atoms

export type Space = {
  _id: string;
  Description: string;
  Title: string;
  Subject: string;
  FromTime: string;
  ToTime: string;
  Venue: string;
};

export const spaces = atom<Space[]>({
  key: "spaces",
  default: [],
});
// Signup Atoms
export const signupUsername = atom({
  key: "signupUsername",
  default: "",
});

export const signupEmail = atom({
  key: "signupEmail",
  default: "",
});

export const signupPassword = atom({
  key: "signupPassword",
  default: "",
});

// Signin Atoms
export const signinEmail = atom({
  key: "signinEmail",
  default: "",
});

export const signinPassword = atom({
  key: "signinPassword",
  default: "",
});

// OTP Atoms
export const otp = atom({
  key: "otp",
  default: "",
});

export const otp_try_count = atom({
  key: "otp_try_count",
  default: 0,
});

// Space Details Atoms
export const space_title = atom({
  key: "space_title",
  default: "",
});

export const space_description = atom({
  key: "space_description",
  default: "",
});

export const space_subject = atom({
  key: "space_subject",
  default: "",
});

export const space_venue = atom({
  key: "space_venue",
  default: "",
});

export const space_from_time = atom({
  key: "space_from_time",
  default: new Date().getHours(),
});

export const space_to_time = atom({
  key: "space_to_time",
  default: new Date().getHours(),
});

export const joinedSpaces = atom<string[]>({
  key: "joinedSpaces",
  default: [],
});

export const ButtonStatus = atom<string>({
  key: "ButtonStatus",
  default: "",
});
