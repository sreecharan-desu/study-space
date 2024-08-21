import React, { Suspense } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { signupEmail, signupPassword, signupUsername } from '../store/store';

export default function Signup() {
    const WarningMessage = React.lazy(() => import('../Warning Message/warning-message'));
    const InputBox = React.lazy(() => import('../form-components/components/InputBox'));
    const Sign = React.lazy(() => import('../form-components/components/sign-button'));

    const navigate = useNavigate();

    const [username, setUsername] = useRecoilState(signupUsername);
    const [email, setEmail] = useRecoilState(signupEmail);
    const [password, setPassword] = useRecoilState(signupPassword);

    const onclickHandler = () => {
        navigate('/signin');
    };

    const UsernameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const PasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const EmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const sendDataToBackend = () => {
        alert(username);
    };

    return (
        <div style={{ backgroundColor: 'rgb(229 231 235)', minHeight: '100vh' }}>
            <div className="h-30">
                <Suspense fallback={<div>Loading...</div>}>
                    <WarningMessage />
                </Suspense>
            </div>
            <div className="flex justify-center">
                <div className="flex items-center justify-center m-10 max-w-lg">
                    <div className="p-8 bg-white shadow-md text-center rounded-md">
                        <h1 className="flex justify-center text-2xl font-bold text-gray-800 text-center">
                            <img src={'/logo.svg'} className="w-10 h-10" alt="StudySpace Logo" />
                            <p className="mt-2 m-2">StudySpace</p>
                        </h1>
                        <label className="block mt-1 text-gray-600">
                            <Suspense fallback={<div>Loading...</div>}>
                                <InputBox input_type="text" placeholder_text="John Doe" OnchangeFn={UsernameHandler} />
                            </Suspense>
                        </label>
                        <label className="block mt-1 text-gray-600">
                            <Suspense fallback={<div>Loading...</div>}>
                                <InputBox input_type="email" placeholder_text="7364734@iitb.ac.in" OnchangeFn={EmailHandler} />
                            </Suspense>
                        </label>
                        <label className="block mt-1 text-gray-600">
                            <Suspense fallback={<div>Loading...</div>}>
                                <InputBox input_type="password" placeholder_text="Password" OnchangeFn={PasswordHandler} />
                            </Suspense>
                        </label>
                        <div>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Sign button_value="Signup" onclickFunction={sendDataToBackend} />
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
        </div>
    );
}
