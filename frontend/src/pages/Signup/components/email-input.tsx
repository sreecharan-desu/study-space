import { useSetRecoilState } from "recoil";
import { signupEmail } from "../../store/store";
import { useState } from "react";

export default function Email() {
  const setEmail = useSetRecoilState(signupEmail);
  const [isFocused, setIsFocused] = useState(false);
  const EmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <input
      type="email"
      placeholder="2638978@iitb.ac.in"
      className={`w-full p-3 border rounded-md transition-shadow duration-300 ease-in-out ${
        isFocused
          ? "border-black shadow-md ring-2 ring-black"
          : "border-gray-300 shadow-sm"
      }`}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onChange={EmailHandler}
    />
  );
}
