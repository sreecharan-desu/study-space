import { useSetRecoilState } from "recoil";
import { space_title } from "../../../../store/store";
import { useState } from "react";

export default function Title() {
  const setTitle = useSetRecoilState(space_title);
  const [isFocused, setIsFocused] = useState(false);
  const titleHandler = (event: any) => {
    setTitle(event.target.value);
  };

  return (
    <>
      <input
        type={"text"}
        placeholder={"Title"}
        className={`w-full p-3 border rounded-md transition-shadow duration-300 ease-in-out ${
          isFocused
            ? "border-black shadow-md ring-2 ring-black"
            : "border-gray-300 shadow-sm"
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={titleHandler}
      />
    </>
  );
}
