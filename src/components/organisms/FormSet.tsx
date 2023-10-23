import Button from 'components/atoms/Button';
import InputTextLabel from '../molecules/InputTextLabel';

interface FormSetProps {
  email: string;
  password: string;
  passwordConfirm?: string;
  signup?: boolean;
  error?: string;
  onChange?: any;
  onSubmit?: any;
}

export default function FormSet({
  email,
  password,
  passwordConfirm,
  onChange,
  signup,
  error,
  onSubmit,
}: FormSetProps) {
  const text = signup ? '회원가입' : '로그인';

  return (
    <>
      <h2>{text}</h2>
      {error && error?.length > 0 && <p>{error}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <InputTextLabel
            label="아이디"
            type="email"
            id="user-id"
            value={email}
            onChange={onChange}
          />
        </div>
        <div>
          <InputTextLabel
            label="비밀번호"
            type="password"
            id="user-pw"
            value={password}
            onChange={onChange}
          />
        </div>
        {signup && (
          <div>
            <InputTextLabel
              label="비밀번호 확인"
              type="password"
              id="user-pw2"
              value={passwordConfirm}
              onChange={onChange}
            />
          </div>
        )}
        <Button
          type="submit"
          disabled={
            (email === '' || password === '' || passwordConfirm === ''
              ? true
              : undefined) || (error ? error?.length > 0 : undefined)
          }>
          {text}
        </Button>
      </form>
    </>
  );
}
