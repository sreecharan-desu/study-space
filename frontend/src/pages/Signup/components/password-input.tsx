import { useSetRecoilState } from "recoil";
import { signupPassword } from "../../store/store";
import { useState } from "react";

export default function PasswordInput() {
  const setPassword = useSetRecoilState(signupPassword);
  const [isFocused, setIsFocused] = useState(false);
  const PasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <input
      type="password"
      placeholder="Enter your password"
      className={`w-full p-3 border rounded-md transition-shadow duration-300 ease-in-out ${
        isFocused
          ? "border-black shadow-md ring-2 ring-black"
          : "border-gray-300 shadow-sm"
      }`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onChange={PasswordHandler}
    />
  );
}
