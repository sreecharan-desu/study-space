import React, { Suspense } from 'react';
const Navbar = React.lazy(()=>import('./components/Navbar/Navbar'));
const Spaces = React.lazy(()=>import('./components/Spaces/spaces'));

export default function HomePage(){
    return<>
        <Suspense fallback="Loading">
            <Navbar/>
        </Suspense>
        <Suspense fallback="Loading">
            <Spaces/>
        </Suspense>
    </>
} 