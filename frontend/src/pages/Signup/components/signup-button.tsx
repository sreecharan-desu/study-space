import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
    emai_sent,
    generate_message,
    message,
    message_status,
    signupEmail,
    signupPassword,
    signupUsername
} from "../../store/store";
import { useNavigate } from "react-router";

export default function Button() {

    const navigateTo = useNavigate();
    
    const username = useRecoilValue(signupUsername);
    const email = useRecoilValue(signupEmail);
    const password = useRecoilValue(signupPassword);

    const setGenerateMessage = useSetRecoilState(generate_message);
    const setMessage = useSetRecoilState(message);
    const setMessageStatus = useSetRecoilState(message_status);

    const [email_sent,setEmailSent] = useRecoilState(emai_sent);

    const displayMessage = (message: string) => {
        setMessage(message);
        setMessageStatus(false); // code:red
        setGenerateMessage(true);

        setTimeout(() => {
            setGenerateMessage(false);
            setMessage('');
            setMessageStatus(true); // code:green
        }, 3000);
    };

    const sendDataToBackend = () => {
        if (!email.includes('@')) {
            displayMessage('Invalid Email');
        } else {
            try {
                const sendData = async () => {
                    const data = { username, email, password };
                    console.log(JSON.stringify(data));
                    const res = await fetch('------------------------------------------------', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    const result = await res.json();

                    displayMessage("If the email enterd is valid you will recoieve an OTP.")
                    if(result.emailsent){
                        setEmailSent(true);
                    }else{

                    }
                }
                sendData();
            } catch (e) {
                displayMessage('Error sending data to the backend, please try again!');
            }
        }
    };

    return (
        <>
            <input
                type="button"
                value="Signup"
                className="p-2 m-2 rounded-md"
                style={{ border: '2px solid black' }}
                onClick={sendDataToBackend}
            />
        </>
    );
}
