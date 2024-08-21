import { useRecoilValue } from "recoil"
import { generate_message, message, message_status } from "../store/store"

export default function WarningMessage(){

    const message_background = useRecoilValue(message_status);
    const messageVisibility  = useRecoilValue(generate_message);
    const messageValue = useRecoilValue(message);

    if(messageVisibility){
        return(<>
        <div className="flex justify-center">
            {message_background ? 
                <div className="bg-green-500 rounded-md p-5 text-sm md:text-xl">
                    {messageValue}
                </div>:
                <div className="flex bg-red-500 rounded-md p-5 text-sm md:text-lg md:font-bold md:m-10 md:w-1/2 md:justify-center">
                    {messageValue}
                </div>
            }
        </div>
        </>)
    }else{
        return(<></>)
    }
}