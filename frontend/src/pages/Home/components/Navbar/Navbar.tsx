import React, { Suspense } from "react"
const Button = React.lazy(()=>import('./Button'));
const Heading = React.lazy(()=>import('./navbar-heading'));

export default function Navbar(){
    return<>
        <div className="flex justify-between bg-white shadow-md p-6">
            <div>
                <Suspense fallback="Loading...">
                    <Heading/>
                </Suspense>
            </div>
            <div className="flex justify-between">
                <Suspense fallback="Loading...">
                    <Button text="Create a Space" path = "/signin"/>
                </Suspense>
            </div>
        </div>
    </>
} 