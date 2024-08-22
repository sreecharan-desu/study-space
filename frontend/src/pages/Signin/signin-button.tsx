import { useRecoilValue, useSetRecoilState } from "recoil";
import { USER_SIGNIN_API } from "../apis/apis";
import {
    generate_message,
    is_authenticated,
    message,
    message_status,
    signinEmail,
    signinPassword
} from "../store/store";
import { useNavigate } from "react-router";

export default function SigninButton() {
    const email = useRecoilValue(signinEmail);
    const password = useRecoilValue(signinPassword);
    const setIsAuthenticated = useSetRecoilState(is_authenticated);
    const navigateTo = useNavigate();
    const setGenerateMessage = useSetRecoilState(generate_message);
    const setMessage = useSetRecoilState(message);
    const setMessageStatus = useSetRecoilState(message_status);

    const signinUser = () => {
        if (!email.includes('@')) {
            setMessage('Enter a valid email address');
            setMessageStatus(false); // code: red
            setGenerateMessage(true);

            setTimeout(() => {
                setGenerateMessage(false);
                setMessage('');
                setMessageStatus(true); // code: green
            }, 3000);
        } else {
            try {
                const sendData = async () => {
                    const data = { email, password };
                    const res = await fetch(USER_SIGNIN_API, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });
                    const result = await res.json();
                    localStorage.setItem('token',JSON.stringify(result.token));
                    if(result.success){
                        setIsAuthenticated(true);
                        navigateTo('/')
                    }else{
                        setMessage('Invalid Credentials, please try again!');
                        setMessageStatus(false); // code: red
                        setGenerateMessage(true);   
                    }
                };
                sendData();
            } catch (e) {
                setMessage('Error sending data to the backend, please try again!');
                setMessageStatus(false); // code: red
                setGenerateMessage(true);
                setTimeout(() => {
                    setGenerateMessage(false);
                    setMessage('');
                    setMessageStatus(true); // code: green
                }, 3000);
            }
        }
    };

    return (
        <>
            <input
                type="button"
                value="Signin"
                className="px-6 py-2 rounded-md font-bold hover:bg-black hover:text-white cursor-pointer"
                style={{ border: '2px solid black' }}
                onClick={signinUser}
            />
        </>
    );
}
