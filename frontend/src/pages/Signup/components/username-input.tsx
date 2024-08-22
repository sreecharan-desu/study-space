import { useSetRecoilState } from "recoil";
import { signupUsername } from "../../store/store";

export default function UsernameInput() {
    const setUsername = useSetRecoilState(signupUsername);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    return (
        <input
            type="text"
            placeholder="John Doe"
            className="p-2 m-2 rounded-md"
            style={{ border: '2px solid black' }}
            onChange={handleUsernameChange}
        />
    );
}
