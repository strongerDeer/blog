import { useContext, useState } from 'react';
import Tab from './Tab';
import AuthContext from 'context/AuthContext';
import { collection } from 'firebase/firestore';
import { db } from 'firebaseApp';

export interface CommentsInterface {
  content: string;
  uid: string;
  email: string;
  createAt: string;
}

export type CategoryType = 'Frontend' | 'Backend' | 'Web' | 'Native';

export interface PostProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createAt: string;
  updateAt: string;
  uid: string;
  category: CategoryType;
  comments: CommentsInterface[];
}

export default function PostTab() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostProps[]>([]);

  const defaultTabId = 'all';
  const tabList = [
    { id: defaultTabId, text: '전체' },
    { id: 'my', text: '나의글' },
    { id: 'Frontend', text: 'Frontend' },
    { id: 'Backend', text: 'Backend' },
    { id: 'Web', text: 'Web' },
    { id: 'Native', text: 'Native' },
  ];

  const getPosts = async () => {
    setPosts([]);
    let postRef = collection(db, 'posts');
    let postQuery;

    // if (ativeTab === 'my' && user) {
    // }
  };

  return <Tab tabList={tabList} />;
}
