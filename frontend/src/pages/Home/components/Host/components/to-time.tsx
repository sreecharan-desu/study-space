import { useRecoilState } from "recoil";
import { space_to_time} from "../../../../store/store";


export default function Title(){
    const [time,settime] = useRecoilState(space_to_time);
    const OnclikHandler =(event:any)=>{
        settime(event.target.value);
    }
    return(<>
        <input type={'time'} className="p-2 m-2 rounded-md" style={{ border: '2px solid black' }} onChange={OnclikHandler}/>                        
    </>)
}