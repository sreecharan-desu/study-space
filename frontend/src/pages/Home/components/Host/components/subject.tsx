import { useSetRecoilState } from "recoil";
import { space_subject } from "../../../../store/store";

export default function Subject() {
  const setSubject = useSetRecoilState(space_subject);

  const onClickHandler = (event: any) => {
    setSubject(event.target.value);
  };

  return (
    <>
      <input
        type={"text"}
        placeholder={"subject"}
        className="p-2 m-2 rounded-md"
        style={{ border: "2px solid black" }}
        onChange={onClickHandler}
      />
    </>
  );
}
