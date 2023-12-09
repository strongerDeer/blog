import classNames from 'classnames';
import styles from './Form.module.scss';
import { useContext, useEffect, useState } from 'react';
import AuthContext from 'contexts/AuthContext';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostInterface } from 'types/Post';

interface InputSearchLabelProps {
  id?: string;
  type?: string;
  label?: string;
  value?: string;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  setPost?: React.Dispatch<React.SetStateAction<PostInterface[]>>;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function InputSearchLabel(props: InputSearchLabelProps) {
  const { id, type, label, className, setPost, ...rest } = props;
  const { user } = useContext(AuthContext);
  const [tagQuery, setTagQuery] = useState<string>('');

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagQuery(e?.target?.value?.trim());
  };
  useEffect(() => {
    if (user) {
      let postsRef = collection(db, 'posts');
      let postsQuery = query(
        postsRef,
        where('hashTags', 'array-contains-any', [tagQuery]),
        orderBy('createdAt', 'desc'),
      );
      onSnapshot(postsQuery, (snapShot) => {
        let dataObj = snapShot?.docs?.map((doc) => ({
          ...doc?.data(),
          id: doc?.id,
        }));
        setPost?.(dataObj as PostInterface[]);
      });
    }
  }, [tagQuery, user]);

  return (
    <div
      className={classNames(
        id === 'postTitle' ? styles.post__title : '',
        styles.wrap,
      )}>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type ?? 'text'}
        id={id}
        name={id}
        placeholder={id === 'postTitle' ? 'Title' : ''}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}
