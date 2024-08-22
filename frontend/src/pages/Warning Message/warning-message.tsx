import { useRecoilValue } from "recoil";
import { generate_message, message, message_status } from "../store/store";

export default function WarningMessage() {
    const messageBackground = useRecoilValue(message_status);
    const messageVisibility = useRecoilValue(generate_message);
    const messageValue = useRecoilValue(message);

    if (!messageVisibility) {
        return null;
    }
    return (
        <div className="flex justify-center">
            {messageBackground ? (
                <div className="lex bg-green-500 rounded-md p-5 text-sm md:text-lg md:font-bold md:m-10 md:w-1/2 md:justify-center">
                    {messageValue}
                </div>
            ) : (
                <div className="flex bg-red-500 rounded-md p-5 text-sm md:text-lg md:font-bold md:m-10 md:w-1/2 md:justify-center">
                    {messageValue}
                </div>
            )}
        </div>
    );
}
