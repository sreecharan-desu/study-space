import { useRecoilState, useSetRecoilState } from "recoil";
import { emai_sent, generate_message, is_authenticated, message, message_status, otp, otp_try_count } from "../../store/store";
import { useNavigate } from "react-router";

export default function Button() {
    const setGenerateMessage = useSetRecoilState(generate_message);
    const setMessage = useSetRecoilState(message);
    const setMessageStatus = useSetRecoilState(message_status);

    const [email_sent,setEmailSent] = useRecoilState(emai_sent);
    const navigateTo = useNavigate();

    const displayMessage = (message: string,code : boolean) => {
        setMessage(message);
        setMessageStatus(code); // code:red
        setGenerateMessage(true);

        setTimeout(() => {
            setGenerateMessage(false);
            setMessage('');
            setMessageStatus(true); // code:green
        }, 3000);
    };

    const [OTP, setOTP] = useRecoilState(otp);
    const [otpverifyCount,setCount] = useRecoilState(otp_try_count);
    const [isAuthenticated,setisauthenticated] = useRecoilState(is_authenticated);
    const sendDataToBackend = () => {
            try {
                setCount(otpverifyCount+1);
                if(otpverifyCount > 3){
                    navigateTo('/signin')
                    setEmailSent(false);
                    displayMessage('You have entered incorrect otp three times so try signing up again!',false)
                }else{
                    const sendData = async () => {
                        const data = {OTP};
                        console.log(JSON.stringify(data));
                        const res = await fetch('------------------------------------------------', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        });
                        const result = await res.json();
                        if(result.verified){
                            displayMessage("Verified you will be redirected to the home page",true)
                            navigateTo('/');
                            setisauthenticated(true);
                        }else{
                            setCount(otpverifyCount+1);
                            displayMessage("Authentication failed try again",false) 
                        }
                    }
                    sendData();
                }
            } catch (e) {
                displayMessage('Error sending data to the backend, please try again!',false);
            }
    }

    return (
        <>
            <input
                type="button"
                value="Verify OTP"
                className="p-2 m-2 rounded-md"
                style={{ border: '2px solid black' }}
                onClick={sendDataToBackend}
            />
        </>
    );
}