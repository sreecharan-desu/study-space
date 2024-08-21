import React, { Suspense } from 'react';
import { useNavigate } from 'react-router';

export default function Signin(){
    const WarningMessage = React.lazy(()=>import('../Warning Message/warning-message'));
    const InputBox = React.lazy(()=>import('../form-components/components/InputBox'));
    const Signin = React.lazy(()=>import('../form-components/components/sign-button'));

    const navigate = useNavigate();
    const body = document.body;
    body.style.backgroundColor =  'rgb(229 231 235)'
    const onclikHandler = ()=>{
        navigate('/signup')
    }
    return<>
        <div className='h-30'>
            <Suspense fallback="Loading"><WarningMessage/></Suspense>            
        </div>
        <div className='flex justify-center'>
            <div className="flex items-center justify-center m-10 max-w-lg">
                <div className="p-8 bg-white shadow-md text-center rounded-md">
                    <h1 className="flex justify-center text-2xl font-bold text-gray-800 text-center">
                        <img src={'/logo.svg'} className='w-10 h-10' /> <p className='mt-2 m-2'>StudySpace</p>
                    </h1>
                    <p className="mt-1 text-gray-600">
                        <Suspense fallback="Loading..."> <InputBox input_type='email' placeholder_text='6735782@iitb.ac.in'/> </Suspense>
                    </p>
                    <p className="mt-1 text-gray-600">
                        <Suspense fallback="Loading..."> <InputBox input_type='password' placeholder_text='Password'/> </Suspense>
                    </p>
                    <div>
                        <Suspense fallback="Loading"><Signin button_value='Signin'/></Suspense>            
                    </div>
                    <p className="mt-3 text-sm text-gray-900">
                    <div className="mt-4 text-sm text-red-600 font-semibold text-center">
                        *Please only enter your college mail to continue
                    </div>
                    <p className="flex justify-center m-1 text-center" style={{fontSize : '14px'}}>
                        New to Studyspace! &nbsp; <a className='underline font-bold cursor-pointer' onClick={onclikHandler}> Signup </a>
                    </p>
                    </p>
                </div>
            </div>
        </div>
    

    </>
} 