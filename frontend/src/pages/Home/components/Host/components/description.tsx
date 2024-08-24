import { useSetRecoilState } from "recoil";
import { space_description } from "../../../../store/store";

export default function Description() {
  const setDescription = useSetRecoilState(space_description);

  const descHandler = (event: any) => {
    setDescription(event.target.value);
  };

  return (
    <>
      <input
        type={"text"}
        placeholder={"Description"}
        className="p-2 m-2 rounded-md"
        style={{ border: "2px solid black" }}
        onChange={descHandler}
      />
    </>
  );
}
