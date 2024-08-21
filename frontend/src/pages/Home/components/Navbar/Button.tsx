import { useNavigate } from "react-router"
import { useSetRecoilState } from "recoil";
import { generate_message, message, message_status } from "../../../store/store";

type propsType = {
    text : string,
    path : string
}

export default function Button({text,path}:propsType){
    const setgenerateMessage = useSetRecoilState(generate_message);
    const setMessage = useSetRecoilState(message);
    const setMessageStatus = useSetRecoilState(message_status);

    const navigateTo = useNavigate();
    const onclickHandler =()=>{
        console.log(path == '/signin')
        if(path == '/signin'){
            if(localStorage.getItem('token')){
                navigateTo('/');
            }
            else{
                setMessage('You need to signin to access this page!');
                setMessageStatus(false);//code:red
                setgenerateMessage(true);
                navigateTo('/signin')
                console.log("Logged")
                setTimeout(()=>{
                    setgenerateMessage(false);
                    setMessage('');
                    setMessageStatus(true);//code:green
                },3000)
            }
        }
        else if(path == '/signup'){
            navigateTo('/signup')
        }
        else if(path == '/createspace'){
            if(localStorage.getItem('token')){
                navigateTo('/createspace');}
            else{
                setMessage('You need to signin to create a space!');
                setMessageStatus(false);//code:red
                setgenerateMessage(true);
                navigateTo('/signin')
                setTimeout(()=>{
                    setgenerateMessage(false);
                    setMessage('');
                    setMessageStatus(true);//code:green
                },3000)
            }
        }
    }
    return(<>
        <button className="px-4 py-1 bg-white text-black hover:bg-black hover:text-white font-semibold rounded ml-2" style={{border : '2px solid black'}} onClick={onclickHandler}>
            {text}
        </button>
    </>)
}