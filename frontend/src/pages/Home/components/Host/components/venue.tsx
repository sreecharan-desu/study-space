import { useSetRecoilState } from "recoil";
import { space_venue } from "../../../../store/store";

export default function Venue() {
  const setVenue = useSetRecoilState(space_venue);

  const onClickHandler = (event: any) => {
    setVenue(event.target.value);
  };

  return (
    <>
      <input
        type={"text"}
        placeholder={"Venue"}
        className="p-2 m-2 rounded-md"
        style={{ border: "2px solid black" }}
        onChange={onClickHandler}
      />
    </>
  );
}
