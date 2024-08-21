import React, { Suspense } from "react"
const SpaceComp = React.lazy(()=>import('./space-component'));
export default function Spaces(){


    const spaces = [1,2,3,4,5];

    return<>
    <Suspense fallback="Loading...">
        <div className=' m-10 font-bold text-2xl first-letter:text-4xl md:m-20 md:text-4xl md:first-letter:text-6xl'>
            Welcome to StudySpace!
        </div>
        <div className="grid grid-cols-1 justify-center md:grid-cols-3 lg:grid-cols-2">
            {spaces.map(()=>{
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