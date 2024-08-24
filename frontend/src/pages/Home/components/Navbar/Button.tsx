import { useNavigate } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  generate_message,
  is_authenticated,
  message,
  message_status,
  spaces,
} from "../../../store/store";
import { FETCH_SPACES_API, JOIN_SPACE_API } from "../../../apis/apis";

type PropsType = {
  text: string;
  space_id: string;
};

export default function Join_Create_Space({ text, space_id }: PropsType) {
  const setGenerateMessage = useSetRecoilState(generate_message);
  const setMessage = useSetRecoilState(message);
  const setMessageStatus = useSetRecoilState(message_status);
  const isAuthenticated = useRecoilValue(is_authenticated);
  const navigateTo = useNavigate();
  const setSpaces = useSetRecoilState(spaces);

  const displayMessage = (message: string, status: boolean) => {
    setMessage(message);
    setMessageStatus(status);
    setGenerateMessage(true);
    setTimeout(() => {
      setGenerateMessage(false);
      setMessage("");
      setMessageStatus(true);
    }, 3000);
  };

  const onClickHandler = (space_id: string) => {
    if (isAuthenticated) {
      const JoinSpace = async () => {
        const tokenString = localStorage.getItem("token");
        const token = tokenString ? JSON.parse(tokenString) : null;
        const bodyData = JSON.stringify({
          space_id,
        });
        const res = await fetch(JOIN_SPACE_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: bodyData,
        });
        const data = await res.json();
        if (data.success) {
          displayMessage(data.msg || "Successfully joined the space!", true);
          const getSpaces = async () => {
            try {
              const token = localStorage.getItem("token");

              if (!token) {
                console.error("No token found in localStorage");
                return;
              }

              const res = await fetch(FETCH_SPACES_API, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: "Bearer " + JSON.parse(token),
                },
              });

              if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
              }

              const data = await res.json();
              setSpaces(data.spaces);
            } catch (error) {
              console.error("Error fetching spaces:", error);
            }
          };

          getSpaces();
        } else {
          displayMessage(
            data.msg || "Failed to joined the space please try again!",
            false
          );
        }
      };
      JoinSpace();
    } else {
      displayMessage(
        "You need to Signin to join or to create the space!",
        false
      );
      navigateTo("/signin");
    }
  };

  return (
    <>
      <button
        className="px-4 py-1 bg-white text-black hover:bg-black hover:text-white font-semibold rounded ml-2"
        style={{ border: "2px solid black" }}
        onClick={() => onClickHandler(space_id)}
      >
        {text}
      </button>
    </>
  );
}
