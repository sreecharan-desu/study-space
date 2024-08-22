import { useSetRecoilState } from "recoil";
import { space_from_time } from "../../../../store/store";

export default function FromTime() {
  const setTime = useSetRecoilState(space_from_time);

  const onClickHandler = (event: any) => {
    setTime(event.target.value);
  };

  return (
    <>
      <input
        type={"time"}
        className="p-2 m-2 rounded-md"
        style={{ border: "2px solid black" }}
        onChange={onClickHandler}
      />
    </>
  );
}
