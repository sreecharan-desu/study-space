import { useNavigate } from "react-router"

type propsType = {
    text : string,
    path : string
}

export default function Button({text,path}:propsType){
    const navigateTo = useNavigate();
    const onclickHandler =()=>{
        if(localStorage.getItem('token'))
        navigateTo(path);
    }
    return(<>
        <button className="px-4 py-1 bg-white text-black hover:bg-black hover:text-white font-semibold rounded ml-2" style={{border : '2px solid black'}} onClick={onclickHandler}>
            {text}
        </button>
    </>)
}