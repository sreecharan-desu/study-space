import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  generate_message,
  message,
  message_status,
  space_description,
  space_from_time,
  space_subject,
  space_title,
  space_to_time,
  space_venue,
} from "../../../../store/store";
import { CREATE_SPACE_API } from "../../../../apis/apis";

export default function CreateSpace() {
  const setGenerateMessage = useSetRecoilState(generate_message);
  const setMessage = useSetRecoilState(message);
  const setMessageStatus = useSetRecoilState(message_status);

  const displayMessage = (message: string, code: boolean) => {
    setMessage(message);
    setMessageStatus(code); // code: red
    setGenerateMessage(true);

    setTimeout(() => {
      setGenerateMessage(false);
      setMessage("");
      setMessageStatus(true); // code: green
    }, 3000);
  };

  const title = useRecoilValue(space_title);
  const description = useRecoilValue(space_description);
  const venue = useRecoilValue(space_venue);
  const from_time = useRecoilValue(space_from_time);
  const to_time = useRecoilValue(space_to_time);
  const subject = useRecoilValue(space_subject);

  const onclickhandler = async () => {
    const createSpace = async () => {
      if (
        title === "" ||
        description === "" ||
        venue === "" ||
        subject === ""
      ) {
        alert("Please fill in all the details to create a space!");
      } else {
        try {
          const token = localStorage.getItem("token");
          const bodyData = JSON.stringify({
            title,
            description,
            venue,
            from_time,
            to_time,
            subject,
          });
          if (!token) {
            displayMessage("No token found in localStorage", false);
            return;
          }
          const res = await fetch(CREATE_SPACE_API, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + JSON.parse(token),
            },
            body: bodyData,
          });

          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
          if (data.success) {
            displayMessage("Space created successfully", true);
          }
        } catch (error) {
          console.error("Error creating spaces:", error);
        }
      }
    };
    createSpace();
  };

  return (
    <>
      <input
        type="button"
        value={"Create Space"}
        className="px-4 py-2 bg-white text-black font-bold hover:bg-black hover:text-white"
        style={{ border: "2px solid black" }}
        onClick={onclickhandler}
      />
    </>
  );
}
