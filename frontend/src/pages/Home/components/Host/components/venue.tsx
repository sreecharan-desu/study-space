import { useSetRecoilState } from "recoil";
import { space_venue } from "../../../../store/store";
import { useState } from "react";

export default function Venue() {
  const setVenue = useSetRecoilState(space_venue);
  const [isFocused, setIsFocused] = useState(false);
  const onClickHandler = (event: any) => {
    setVenue(event.target.value);
  };

  return (
    <>
      <input
        type={"text"}
        placeholder={"Venue"}
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
