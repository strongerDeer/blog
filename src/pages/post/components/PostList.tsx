import { useContext, useEffect, useState } from 'react';

import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseApp';

import AuthContext from 'context/AuthContext';

import PostCardList from './PostCardList';

import { PostInterface } from 'types/Post';
import InputSearchLabel from 'components/commons/input/InputSearchLabel';
import { ALL_POST, MY_POST } from 'pages/home';

interface PostListProps {
  activeTab?: string;
}
export default function PostList({ activeTab }: PostListProps) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, 'posts');

      let postQuery;

      if (activeTab === ALL_POST) {
        // 전체
        postQuery = query(postsRef, orderBy('createdAt', 'desc'));
      } else if (activeTab === MY_POST && user) {
        // 나의 글
        postQuery = query(
          postsRef,
          where('uid', '==', user?.uid),
          orderBy('createdAt', 'desc'),
        );
      } else if (activeTab === 'like') {
        // 좋아요
        postQuery = query(
          postsRef,
          where('likes', 'array-contains', user?.uid),
          orderBy('createdAt', 'desc'),
        );
      } else {
        // 카테고리글 보여주기
        postQuery = query(
          postsRef,
          where('category', '==', activeTab),
          orderBy('createdAt', 'desc'),
        );
      }

      onSnapshot(postQuery, (snapshot) => {
        let dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as PostInterface[]);
      });
    }
  }, [activeTab]);

  return (
    <section className="post">
      <InputSearchLabel setPost={setPosts} />

      <PostCardList posts={posts} />
    </section>
  );
}
