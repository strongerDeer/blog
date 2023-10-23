import Button from 'components/atoms/Button';
import InputTextLabel from '../molecules/InputTextLabel';

interface FormSetProps {
  email: string;
  password: string;
  onChange?: any;
  passwordConfirm?: string;
  signup?: boolean;
  error?: string;
}

export default function FormSet({
  email,
  password,
  passwordConfirm,
  onChange,
  signup,
  error,
}: FormSetProps) {
  const text = signup ? '회원가입' : '로그인';

  return (
    <>
      <h2>{text}</h2>
      {error && error?.length > 0 && <p>{error}</p>}
      <form method="POST">
        <div>
          <InputTextLabel
            label="아이디"
            id="user-id"
            value={email}
            onChange={onChange}
          />
        </div>
        <div>
          <InputTextLabel
            label="비밀번호"
            id="user-pw"
            value={password}
            onChange={onChange}
          />
        </div>
        {signup && (
          <div>
            <InputTextLabel
              label="비밀번호"
              id="user-pw2"
              value={passwordConfirm}
              onChange={onChange}
            />
          </div>
        )}
        <Button type="submit" disabled={error ? error?.length > 0 : undefined}>
          {text}
        </Button>
      </form>
    </>
  );
}
