import { useSetRecoilState } from "recoil";
import { otp } from "../../store/store";
import { useState } from "react";

export default function OTPInput() {
  const setOTP = useSetRecoilState(otp);
  const [isFocused, setIsFocused] = useState(false);
  const OTPHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOTP(event.target.value);
  };

  return (
    <input
      type="text" // Changed to text for OTP input
      placeholder="Enter OTP"
      className={`w-full p-3 border rounded-md transition-shadow duration-300 ease-in-out ${
        isFocused
          ? "border-black shadow-md ring-2 ring-black"
          : "border-gray-300 shadow-sm"
      }`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onChange={OTPHandler}
    />
  );
}
