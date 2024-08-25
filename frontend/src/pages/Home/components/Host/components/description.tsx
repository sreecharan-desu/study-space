import { useSetRecoilState } from "recoil";
import { space_description } from "../../../../store/store";
import { useState } from "react";

export default function Description() {
  const setDescription = useSetRecoilState(space_description);
  const [isFocused, setIsFocused] = useState(false);
  const descHandler = (event: any) => {
    setDescription(event.target.value);
  };

  return (
    <>
      <input
        type={"text"}
        placeholder={"Description"}
        className={`w-full p-3 border rounded-md transition-shadow duration-300 ease-in-out ${
          isFocused
            ? "border-black shadow-md ring-2 ring-black"
            : "border-gray-300 shadow-sm"
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={descHandler}
      />
    </>
  );
}
