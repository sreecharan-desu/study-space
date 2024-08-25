import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ButtonStatus } from "../../../store/store";
import { useRecoilState } from "recoil";

const TopBar = () => {
  const [activeButton, setActiveButton] = useRecoilState(ButtonStatus);
  const navigate = useNavigate();
  useEffect(() => {
    if (activeButton) {
      switch (activeButton) {
        case "Join Spaces":
          navigate("/");
          break;
        case "Joined Spaces":
          navigate("/joinedspaces");
          break;
        case "Host a new Space":
          navigate("/hostaspace");
          break;
        case "Created Spaces":
          navigate("/createdspaces");
          break;
        default:
          navigate("/");
          break;
      }
    }
  }, [activeButton, navigate]);

  const buttons = [
    { name: "Join Spaces" },
    { name: "Joined Spaces" },
    { name: "Host a new Space" },
    { name: "Created Spaces" },
  ];

  return (
    <div className="bg-whitesmoke text-white p-4 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0">
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        {buttons.map((button) => (
          <button
            key={button.name}
            onClick={() => setActiveButton(button.name)}
            className={`${
              activeButton === button.name
                ? "bg-black text-white"
                : "bg-white text-black"
            } font-semibold py-2 px-6 rounded hover:underline w-full sm:w-auto`}
          >
            {button.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
