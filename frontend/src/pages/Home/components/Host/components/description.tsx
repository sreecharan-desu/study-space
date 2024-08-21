import { useRecoilState } from "recoil";
import { space_description, space_title } from "../../../../store/store";


export default function Title(){
    const [description,setdescription] = useRecoilState(space_description);
    const DescHandler =(event:any)=>{
        setdescription(event.target.value);
    }
    return(<>
        <input type={'text'} placeholder={'Title'} className="p-2 m-2 rounded-md" style={{ border: '2px solid black' }} onChange={DescHandler}/>                        
    </>)
}