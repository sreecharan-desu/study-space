import { useSetRecoilState } from "recoil";
import { space_subject } from "../../../../store/store";
import { useState } from "react";

export default function Subject() {
  const setSubject = useSetRecoilState(space_subject);
  const [isFocused, setIsFocused] = useState(false);
  const onClickHandler = (event: any) => {
    setSubject(event.target.value);
  };

  return (
    <>
      <input
        type={"text"}
        placeholder={"subject"}
        className={`w-full p-3 border rounded-md transition-shadow duration-300 ease-in-out ${
          isFocused
            ? "border-black shadow-md ring-2 ring-black"
            : "border-gray-300 shadow-sm"
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onChange={onClickHandler}
      />
    </>
  );
}
