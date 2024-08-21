import { useRecoilState, useSetRecoilState } from "recoil";
import { space_title } from "../../../../store/store";


export default function Title(){
    const setTitle = useSetRecoilState(space_title);
    const TitleHandler =(event:any)=>{
        setTitle(event.target.value);
    }
    return(<>
        <input type={'text'} placeholder={'Title'} className="p-2 m-2 rounded-md" style={{ border: '2px solid black' }} onChange={TitleHandler}/>                        
    </>)
}