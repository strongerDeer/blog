import Btn from 'components/commons/button/Btn';
import InputTextLabel from 'components/commons/input/InputTextLabel';
import { useInput } from 'hooks/useInput';

export default function LoginPage() {
  const email = useInput('');
  const password = useInput('');

  return (
    <>
      <h2>로그인</h2>

      <form>
        <InputTextLabel
          label="아이디"
          type="email"
          id="user-id"
          value={email.value}
          onChange={email.onChange}
        />
        <InputTextLabel
          label="비밀번호"
          type="password"
          id="user-pw"
          value={password.value}
          onChange={password.onChange}
        />
        <Btn type="submit" fillPrimary>
          로그인
        </Btn>
      </form>

      <p>or</p>

      <div>
        <Btn>Google 로그인</Btn>
        <Btn>GitHub 로그인</Btn>
      </div>
    </>
  );
}
