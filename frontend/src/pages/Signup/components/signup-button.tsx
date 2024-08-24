import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  email_sent,
  generate_message,
  message,
  message_status,
  signupEmail,
  signupPassword,
  signupUsername,
} from "../../store/store";

export default function SignupButton() {
  const username = useRecoilValue(signupUsername);
  const email = useRecoilValue(signupEmail);
  const password = useRecoilValue(signupPassword);

  const setGenerateMessage = useSetRecoilState(generate_message);
  const setMessage = useSetRecoilState(message);
  const setMessageStatus = useSetRecoilState(message_status);
  const setEmailSent = useSetRecoilState(email_sent);

  const displayMessage = (msg: string, isSuccess: boolean) => {
    setMessage(msg);
    setMessageStatus(isSuccess); // true = success (green), false = error (red)
    setGenerateMessage(true);

    setTimeout(() => {
      setGenerateMessage(false);
      setMessage("");
      setMessageStatus(true); // reset to green after timeout
    }, 3000);
  };

  const sendDataToBackend = async () => {
    // if (!email.includes("@iitb.ac.in")) {
    //   displayMessage("We are currently available in only IITB!", false);
    //   return;
    // }
    if (!email.includes("@")) {
      displayMessage(
        "Invalid email address. Please enter a valid email.",
        false
      );
    } else {
      displayMessage("Processing your signup request...", true);
      try {
        const data = { username, email, password };
        console.log(data);
        const response = await fetch(
          "http://localhost:3000/api/v1/user/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const result = await response.json();
        console.log(result);
        if (result.success) {
          localStorage.setItem("email", JSON.stringify(email));
          displayMessage(result.msg, result.success);
          setEmailSent(true);
        } else {
          displayMessage(result.msg, result.success);
        }
      } catch (error) {
        displayMessage(
          "Error sending data to the backend. Please try again later." + error,
          false
        );
      }
    }
  };

  return (
    <input
      type="button"
      value="Signup"
      className="p-2 m-2 rounded-md hover:bg-black hover:text-white cursor-pointer font-bold"
      style={{ border: "2px solid black" }}
      onClick={sendDataToBackend}
    />
  );
}
