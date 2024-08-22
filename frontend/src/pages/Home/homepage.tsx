import React, { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import { is_authenticated } from '../store/store';

const Navbar = React.lazy(() => import('./components/Navbar/Navbar'));
const Spaces = React.lazy(() => import('./components/Spaces/spaces'));
const WarningMessage = React.lazy(() => import('../Warning Message/warning-message'));
const HostSpace = React.lazy(() => import('./components/Host/HostSpace'));

export default function HomePage() {
  document.body.style.backgroundColor = 'white';
  const isAuthenticated = useRecoilValue(is_authenticated);

  return (
    <>
      <Suspense fallback="Loading">
        <Navbar />
      </Suspense>
      <Suspense fallback="Loading...">
        <WarningMessage />
      </Suspense>
      <Suspense fallback="Loading">
        {
          isAuthenticated ? 
          <>
            <HostSpace />
            <Spaces />
          </>
          :
          <Spaces />
        }
      </Suspense>
    </>
  );
}
