import { useContext, useState } from 'react';

//toastify
import { toast } from 'react-toastify';

// firebase
import { db } from 'firebaseApp';
import { addDoc, collection } from 'firebase/firestore';

import Button from './atoms/Button';
import InputTextLabel from './molecules/InputTextLabel';
import TextareaLabel from './molecules/TextareaLabel';
import AuthContext from 'context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function PostCreate() {
  const [title, setTitle] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, 'posts'), {
        title: title,
        summary: summary,
        content: content,
        createAt: new Date()?.toLocaleDateString(),
        email: user?.email,
      });
      toast.success('게시글 작성 완료!');
      navigate('/post');

      // fireabase로 데이터 생성
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {
      target: { name, value },
    } = e;

    if (name === 'postTitle') {
      setTitle(value);
    }

    if (name === 'postSummary') {
      setSummary(value);
    }

    if (name === 'postContent') {
      setContent(value);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <InputTextLabel
        label="제목"
        id="postTitle"
        onChange={onChange}
        value={title}
      />
      <InputTextLabel
        label="요약"
        id="postSummary"
        onChange={onChange}
        value={summary}
      />
      <TextareaLabel
        label="내용"
        id="postContent"
        onChange={onChange}
        value={content}
      />
      <Button type="submit">제출</Button>
    </form>
  );
}
