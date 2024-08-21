import { useRecoilState, useSetRecoilState } from "recoil";
import { space_venue } from "../../../../store/store";


export default function Title(){
    const setvenue = useSetRecoilState(space_venue);
    const OnclikHandler =(event:any)=>{
        setvenue(event.target.value);
    }
    return(<>
        <input type={'text'} placeholder={'Venue'} className="p-2 m-2 rounded-md" style={{ border: '2px solid black' }} onChange={OnclikHandler}/>                        
    </>)
}