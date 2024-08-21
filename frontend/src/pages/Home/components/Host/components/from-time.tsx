import { useSetRecoilState } from "recoil";
import { space_from_time} from "../../../../store/store";


export default function Title(){
    const settime = useSetRecoilState(space_from_time);
    const OnclikHandler =(event:any)=>{
        settime(event.target.value);
    }
    return(<>
        <input type={'time'} className="p-2 m-2 rounded-md" style={{ border: '2px solid black' }} onChange={OnclikHandler}/>                        
    </>)
}