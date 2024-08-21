import React, { Suspense } from 'react';
const Navbar = React.lazy(()=>import('./components/Navbar/Navbar'));
const Spaces = React.lazy(()=>import('./components/Spaces/spaces'));
const WarningMessage = React.lazy(()=>import('../Warning Message/warning-message'));
const HostSpace = React.lazy(()=>import('./components/Host/HostSpace'));

export default function HomePage(){
    document.body.style.backgroundColor =  'white'
    return<>
        <Suspense fallback="Loading">
            <Navbar/>
        </Suspense>
        <Suspense fallback="Loading...">
            <WarningMessage/>
        </Suspense>
        <Suspense fallback="Loading">
            <HostSpace/>
            <Spaces/>
        </Suspense>
    </>
} 