import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  generate_message,
  is_authenticated,
  message,
  message_status,
  signinEmail,
  signinPassword,
} from "../store/store";
import { useNavigate } from "react-router";
import { USER_SIGNIN_API } from "../apis/apis";
import { useState } from "react";

export default function SigninButton() {
  const email = useRecoilValue(signinEmail);
  const password = useRecoilValue(signinPassword);
  const setIsAuthenticated = useSetRecoilState(is_authenticated);
  const navigateTo = useNavigate();
  const setGenerateMessage = useSetRecoilState(generate_message);
  const setMessage = useSetRecoilState(message);
  const setMessageStatus = useSetRecoilState(message_status);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signinUser = async () => {
    if (!email.includes("@")) {
      setMessage("Enter a valid email address");
      setMessageStatus(false); // code: red
      setGenerateMessage(true);

      setTimeout(() => {
        setGenerateMessage(false);
        setMessage("");
        setMessageStatus(true); // code: green
      }, 3000);
      return;
    }

    setIsLoading(true);
    try {
      const sendData = async () => {
        const data = { email, password };
        // if (!email.includes("@iitb.ac.in")) {
        //   setMessage("We are currently available in only IITB!");
        //   setMessageStatus(false); // code: red
        //   setGenerateMessage(true);
        //   return;
        // }
        const res = await fetch(USER_SIGNIN_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const result = await res.json();
        if (result.success) {
          localStorage.setItem("token", JSON.stringify(result.token));
          localStorage.removeItem("email");
          setIsAuthenticated(true);
          navigateTo("/");
        } else {
          setMessage(result.msg);
          setMessageStatus(false); // code: red
          setGenerateMessage(true);
        }
      };
      await sendData();
    } catch (e) {
      setMessage("Error sending data to the backend, please try again!" + e);
      setMessageStatus(false); // code: red
      setGenerateMessage(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        setGenerateMessage(false);
        setMessage("");
        setMessageStatus(true); // code: green
      }, 3000);
    }
  };

  return (
    <input
      type="button"
      value={isLoading ? "Signing in..." : "Signin"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`mt-5 w-3/4 cursor-pointer px-6 py-2 border rounded-md transition-all duration-300 ease-in-out ${
        isHovered
          ? "bg-black text-white border-black shadow-md"
          : "bg-white text-black border-gray-300 shadow-sm"
      } ${isLoading ? "cursor-not-allowed opacity-50" : ""}`}
      onClick={!isLoading ? signinUser : undefined}
    />
  );
}
