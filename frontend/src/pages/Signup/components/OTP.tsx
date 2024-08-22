import { useSetRecoilState } from "recoil";
import { otp } from "../../store/store";

export default function OTPInput() {
    const setOTP = useSetRecoilState(otp);

    const OTPHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOTP(event.target.value);
    };

    return (
        <input
            type="text" // Changed to text for OTP input
            placeholder="Enter OTP"
            className="p-2 m-2 rounded-md hover:bg-black hover:text-white cursor-pointer font-bold"
            style={{ border: '2px solid black' }}
            onChange={OTPHandler}
        />
    );
}
