import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  email_sent,
  generate_message,
  is_authenticated,
  message,
  message_status,
  otp,
  otp_try_count,
} from "../../store/store";
import { useNavigate } from "react-router";
import { VERIFY_OTP_API } from "../../apis/apis";

export default function VerifyOTP() {
  const setGenerateMessage = useSetRecoilState(generate_message);
  const setMessage = useSetRecoilState(message);
  const setMessageStatus = useSetRecoilState(message_status);
  const setEmailSent = useSetRecoilState(email_sent);
  const navigateTo = useNavigate();

  const displayMessage = (message: string, code: boolean) => {
    setMessage(message);
    setMessageStatus(code); // code:red
    setGenerateMessage(true);

    setTimeout(() => {
      setGenerateMessage(false);
      setMessage("");
      setMessageStatus(true); // code:green
    }, 3000);
  };

  const OTP = useRecoilValue(otp);
  const [otpverifyCount, setCount] = useRecoilState(otp_try_count);
  const setIsAuthenticated = useSetRecoilState(is_authenticated);

  const sendDataToBackend = async () => {
    try {
      setCount(otpverifyCount + 1);
      if (otpverifyCount > 1) {
        navigateTo("/signup");
        setEmailSent(false);
        displayMessage(
          "You have entered incorrect Security code so try signing up again!",
          false
        );
        setCount(0);
      } else {
        const emailString = localStorage.getItem("email");
        console.log(emailString);
        const email = emailString ? JSON.parse(emailString) : null;
        const data = { email, securitycode: OTP };
        console.log(JSON.stringify(data));

        const res = await fetch(VERIFY_OTP_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await res.json();
        if (result.success) {
          displayMessage(result.msg, true);
          setIsAuthenticated(true);
          navigateTo("/signin");
        } else {
          setCount(otpverifyCount + 1);
          displayMessage(result.msg, false);
        }
      }
    } catch (e) {
      displayMessage(
        "Error sending data to the backend, please try again!" + e,
        false
      );
    }
  };

  return (
    <input
      type="button"
      value="Verify OTP"
      className="p-2 m-2 rounded-md"
      style={{ border: "2px solid black" }}
      onClick={sendDataToBackend}
    />
  );
}
