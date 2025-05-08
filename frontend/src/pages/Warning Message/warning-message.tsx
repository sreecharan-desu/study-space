import { useRecoilState, useRecoilValue } from "recoil";
import { generate_message, message, message_status } from "../store/store";
import { useState, useEffect } from "react";

export default function WarningMessage({ className = "" }) {
  const messageBackground = useRecoilValue(message_status); // true = success, false = error
  const [messageVisibility, setVisibility] = useRecoilState(generate_message);
  const messageValue = useRecoilValue(message);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (messageVisibility && messageValue) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setVisibility(false);
        console.log("WarningMessage: Timeout completed, removed from DOM");
      }, 3000); // 3s duration
      return () => {
        clearTimeout(timer);
        console.log("WarningMessage: Timer cleaned up");
      };
    }
  }, [messageVisibility, messageValue, setVisibility]);

  // Return null if not visible or no message content
  if (!visible || !messageValue) {
    console.log("WarningMessage: Not rendering, returning null");
    return null;
  }

  console.log("WarningMessage: Rendering message", { messageValue, messageBackground });

  return (
    <div
      className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-in-out opacity-100 translate-y-0 ${className}`}
      style={{ pointerEvents: "none" }}
    >
      <div
        className={`${
          messageBackground ? "bg-gray-800 border-gray-700" : "bg-gray-900 border-gray-800"
        } rounded-lg p-4 px-6 text-white text-sm md:text-base font-semibold shadow-lg border flex items-center max-w-sm mx-auto`}
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {messageBackground ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          )}
        </svg>
        {messageValue}
      </div>
    </div>
  );
}