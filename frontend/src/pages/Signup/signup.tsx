import React, { Suspense } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { emai_sent } from '../store/store';

export default function Signup() {
    const WarningMessage = React.lazy(() => import('../Warning Message/warning-message'));
    const navigate = useNavigate();

    const Username = React.lazy(()=>import('./components/username-input'))
    const Email = React.lazy(()=>import('./components/email-input'))
    const Password = React.lazy(()=>import('./components/password-input'))
    const SignupButton = React.lazy(()=>import('./components/signup-button'))
    const OTP = React.lazy(()=>import('./components/OTP'));
    const OTP_BUTTON =  React.lazy(()=>import('./components/check-otp'))

    const email_sent= useRecoilValue(emai_sent);

    const onclickHandler = () => {
        navigate('/signin');
    };

    return (
        <div style={{ backgroundColor: 'rgb(229 231 235)', minHeight: '100vh' }}>
            <div className="h-30">
                <Suspense fallback={<div>Loading...</div>}>
                    <WarningMessage />
                </Suspense>
            </div>
            {
            email_sent ? 
            <>
                <div className="flex justify-center">
                    <div className="flex items-center justify-center m-10 max-w-lg">
                        <div className="p-8 bg-white shadow-md text-center rounded-md">
                            <h1 className="flex justify-center text-2xl font-bold text-gray-800 text-center">
                                <img src={'/logo.svg'} className="w-10 h-10" alt="StudySpace Logo" />
                                <p className="mt-2 m-2">StudySpace</p>
                            </h1>
                            <label className="block mt-1 text-gray-600">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <OTP/>
                                </Suspense>
                            </label>
                            <div>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <OTP_BUTTON/>
                                </Suspense>
                            </div>
                        </div>
                    </div>
                </div>
            </> : 
            <>
                <div className="flex justify-center">
                    <div className="flex items-center justify-center m-10 max-w-lg">
                        <div className="p-8 bg-white shadow-md text-center rounded-md">
                            <h1 className="flex justify-center text-2xl font-bold text-gray-800 text-center">
                                <img src={'/logo.svg'} className="w-10 h-10" alt="StudySpace Logo" />
                                <p className="mt-2 m-2">StudySpace</p>
                            </h1>
                            <label className="block mt-1 text-gray-600">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Username/>
                                </Suspense>
                            </label>
                            <label className="block mt-1 text-gray-600">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Email/>
                                </Suspense>
                            </label>
                            <label className="block mt-1 text-gray-600">
                                <Suspense fallback={<div>Loading...</div>}>
                                    <Password/>
                                </Suspense>
                            </label>
                            <div>
                                <Suspense fallback={<div>Loading...</div>}>
                                    <SignupButton/>
                                </Suspense>
                            </div>
                            <div className="mt-4 text-sm text-red-600 font-semibold text-center">
                                *Please only enter your college mail to continue
                            </div>
                            <p className="flex justify-center m-1 text-center" style={{ fontSize: '14px' }}>
                                Already have an account? &nbsp;
                                <a className="underline font-bold cursor-pointer" onClick={onclickHandler}>
                                    Signin
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </>
            }
            
        </div>
    );
}
