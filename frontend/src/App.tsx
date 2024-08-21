import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import React, { Suspense } from 'react'

const HomePage = React.lazy(()=>import('./pages/Home/homepage'));
const Signin = React.lazy(()=>import('./pages/Signin/signin'));
const Signup = React.lazy(()=>import('./pages/Signup/signup'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Suspense fallback={'Loading...'}><HomePage/></Suspense>} path='/'/>  
          <Route element={<Suspense fallback={'Loading...'}><Signin/></Suspense>} path='/signin'/>  
          <Route element={<Suspense fallback={'Loading...'}><Signup/></Suspense>} path='/signup'/>  
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
