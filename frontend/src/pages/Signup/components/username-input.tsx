import { useSetRecoilState } from "recoil";
import { signupUsername } from "../../store/store";
import { useState } from "react";

export default function UsernameInput() {
  const setUsername = useSetRecoilState(signupUsername);
  const [isFocused, setIsFocused] = useState(false);
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="John Doe"
      className={`w-full p-3 mb-3 border rounded-md transition-shadow duration-300 ease-in-out ${
        isFocused
          ? "border-black shadow-md ring-2 ring-black"
          : "border-gray-300 shadow-sm"
      }`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onChange={handleUsernameChange}
    />
  );
}
