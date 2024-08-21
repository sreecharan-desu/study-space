import { useRecoilValue, useSetRecoilState } from "recoil";
import { generate_message, message, message_status, signupEmail, signupPassword, signupUsername } from "../../store/store";


export default function Button(){

    const username = useRecoilValue(signupUsername);
    const email = useRecoilValue(signupEmail);
    const password = useRecoilValue(signupPassword);

    const setGenerateMessage = useSetRecoilState(generate_message);
    const setMessage = useSetRecoilState(message);
    const setMessageStatus = useSetRecoilState(message_status);

    const DisplayMessage = (message:string)=>{
        setMessage(message);
        setMessageStatus(false); // code:red
        setGenerateMessage(true);
        setTimeout(() => {
            setGenerateMessage(false);
            setMessage('');
            setMessageStatus(true); // code:green
        }, 3000);
    }

    const sendDataToBackend = () => {
        if (!email.includes('@')) {
            DisplayMessage('Invalid Email')
        }else{
            try {
                const sendData = async () => {
                    const data = {username, email, password};
                    console.log(JSON.stringify(data));

                    const res = await fetch('------------------------------------------------', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    const result = await res.json();
                    console.log(result);
                };
                sendData();
            } catch (e) {
                DisplayMessage('Error sending data to the backend, please try again!');
            }
        }
    };

    return(<>
        <input type={'button'} value={"Signup"} className="p-2 m-2 rounded-md" style={{ border: '2px solid black' }} onClick={sendDataToBackend}/>                        
    </>)
}