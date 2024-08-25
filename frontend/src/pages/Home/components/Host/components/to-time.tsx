import { useSetRecoilState } from "recoil";
import { space_to_time } from "../../../../store/store";
import { useState } from "react";

export default function ToTime() {
  const setTime = useSetRecoilState(space_to_time);
  const [isFocused, setIsFocused] = useState(false);

  const onClickHandler = (event: any) => {
    setTime(event.target.value);
  };

  return (
    <>
      <input
        type={"time"}
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
