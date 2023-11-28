import { useContext, useEffect, useState } from 'react';

import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from 'firebaseApp';

import AuthContext from 'context/AuthContext';

import PostCardList from './PostCardList';

import Tab from '../../../components/commons/tab/Tab';
import { PostInterface } from 'types/Post';
import InputSearchLabel from 'components/commons/input/InputSearchLabel';

const ALL_POST = 'all';
const MY_POST = 'my';
const tabList = [
  { id: ALL_POST, text: '전체' },
  { id: MY_POST, text: '나의글' },
  { id: 'Frontend', text: 'Frontend' },
  { id: 'Backend', text: 'Backend' },
  { id: 'Web', text: 'Web' },
  { id: 'Native', text: 'Native' },
];

interface PostListProps {
  defaultTab?: string;
  hasTab?: boolean;
}
export default function PostList({
  hasTab,
  defaultTab = ALL_POST,
}: PostListProps) {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<string>(defaultTab);
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const getPosts = async () => {
    setPosts([]);
    let postsRef = collection(db, 'posts');
    let postQuery;

    if (activeTab === ALL_POST) {
      // 전체
      postQuery = query(postsRef, orderBy('createAt', 'desc'));
    } else if (activeTab === MY_POST && user) {
      // 나의글
      postQuery = query(
        postsRef,
        where('uid', '==', user?.uid),
        orderBy('createAt', 'desc'),
      );
    } else {
      // 카테고리글 보여주기
      postQuery = query(
        postsRef,
        where('category', '==', activeTab),
        orderBy('createAt', 'desc'),
      );
    }
    const datas = await getDocs(postQuery);
    datas.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostInterface]);
    });
  };

  useEffect(() => {
    getPosts();
  }, [activeTab]);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = `${e.currentTarget.dataset.id}`;
    setActiveTab(targetId);
  };

  return (
    <section className="post">
      {hasTab && (
        <>
          <Tab tabList={tabList} activeTab={activeTab} onClick={onClick} />
          <InputSearchLabel setPost={setPosts} />
        </>
      )}

      <PostCardList posts={posts} getPosts={getPosts} />
    </section>
  );
}
