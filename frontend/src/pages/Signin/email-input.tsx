import { useRecoilState } from "recoil";
import { signinEmail } from "../store/store";

export default function Email() {
  const [email, setEmail] = useRecoilState(signinEmail);

  const EmailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    console.log(email);
  };

  return (
    <>
      <input
        type='email'
        placeholder='2638978@iitb.ac.in'
        className="p-2 m-2 rounded-md"
        style={{ border: '2px solid black' }}
        onChange={EmailHandler}
      />
    </>
  );
}
