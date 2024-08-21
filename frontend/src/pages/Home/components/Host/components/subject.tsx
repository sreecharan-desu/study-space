import { useRecoilState } from "recoil";
import { space_subject} from "../../../../store/store";


export default function Title(){
    const [subject,setsubject] = useRecoilState(space_subject);
    const OnclikHandler =(event:any)=>{
        setsubject(event.target.value);
    }
    return(<>
        <input type={'text'} placeholder={'subject'} className="p-2 m-2 rounded-md" style={{ border: '2px solid black' }} onChange={OnclikHandler}/>                        
    </>)
}