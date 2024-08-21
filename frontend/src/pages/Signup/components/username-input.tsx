import { useRecoilState } from "recoil";
import { signupUsername } from "../../store/store";


export default function Username(){
    const [username, setUsername] = useRecoilState(signupUsername);
    const UsernameHandler =(event:any)=>{
        setUsername(event.target.value);
    }
    return(<>
        <input type={'text'} placeholder={'Jhon Doe'} className="p-2 m-2 rounded-md" style={{ border: '2px solid black' }} onChange={UsernameHandler}/>                        
    </>)
}