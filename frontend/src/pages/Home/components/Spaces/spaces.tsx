import React, { Suspense, useEffect } from "react"
import { useRecoilState } from "recoil";
import { spaces } from "../../../store/store";
const SpaceComp = React.lazy(()=>import('./space-component'));
export default function Spaces(){

    const [Spacess,setSpaces] = useRecoilState(spaces);
    useEffect(()=>{
        const getSpaces = async () => {
            try {
                const token = localStorage.getItem('token');
                
                if (!token) {
                    console.error('No token found in localStorage');
                    return;
                }
        
                const res = await fetch('API_ENDPOINT_HERE', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': JSON.parse(token)
                    }
                });
        
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
        
                const data = await res.json();
                setSpaces(data.spaces);
        
            } catch (error) {
                console.error('Error fetching spaces:', error);
            }
        };
        
        getSpaces();

    },[])

    return<>
    <Suspense fallback="Loading...">
        <div className=' m-10 font-bold text-2xl first-letter:text-4xl md:m-20 md:text-4xl md:first-letter:text-6xl'>
            Welcome to StudySpace!
        </div>
        <div className="grid grid-cols-1 justify-center md:grid-cols-3 lg:grid-cols-2">
            {Spacess.map(()=>{
                return(<>
                    <Suspense fallback="Loading...">
                        <SpaceComp heading="Chilling Session" subjectName="Discrete Mathematics" description="Join for an enthusiastic basic covergae lets dvelve deep into the topics and have a freindly conversation." time="6:45 PM" venue="Seminar hall"/>            
                    </Suspense>
                </>)
            })}
        </div>
    </Suspense>
    </>
} 

// heading = "" subjectName="" description="" time="" venue=""