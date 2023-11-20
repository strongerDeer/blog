import { useContext, useState } from 'react';
import Tab from '../../../components/commons/tab/Tab';
import AuthContext from 'context/AuthContext';
import { collection } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostInterface } from 'types/Post';

export default function PostTab() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostInterface[]>([]);

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
