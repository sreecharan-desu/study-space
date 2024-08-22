import { useSetRecoilState } from "recoil";
import { signinPassword } from "../store/store";

export default function Password() {
  const setPassword = useSetRecoilState(signinPassword);

  const PasswordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <input
        type='password'
        placeholder='Enter your password'
        className="p-2 m-2 rounded-md"
        style={{ border: '2px solid black' }}
        onChange={PasswordHandler}
      />
    </>
  );
}
