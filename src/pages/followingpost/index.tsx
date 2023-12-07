import AuthContext from 'context/AuthContext';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseApp';

import PostCardList from 'pages/post/components/PostCardList';

import { useCallback, useContext, useEffect, useState } from 'react';
import { PostInterface } from 'types/Post';

interface UserProps {
  id: string;
}
export default function FollowingPostListPage() {
  const { user } = useContext(AuthContext);
  const [followingPosts, setFollowingPosts] = useState<PostInterface[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>(['']);

  // 실시간 동기화로 user 팔로잉 ID 배열 가져오기
  const getFollowingIds = useCallback(async () => {
    if (user?.uid) {
      const ref = doc(db, 'following', user?.uid);
      onSnapshot(ref, (doc) => {
        setFollowingIds(['']);
        doc?.data()?.users?.map((user: UserProps) => {
          setFollowingIds((prev: string[]) =>
            prev ? [...prev, user?.id] : [],
          );
        });
      });
    }
  }, [user?.uid]);

  useEffect(() => {
    if (user?.uid) getFollowingIds();
  }, [getFollowingIds]);

  useEffect(() => {
    if (user) {
      let postsRef = collection(db, 'posts');
      let followingQuery = query(
        postsRef,
        where('uid', 'in', followingIds),
        orderBy('createAt', 'desc'),
      );

      onSnapshot(followingQuery, (snapShot) => {
        let dataObj = snapShot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setFollowingPosts(dataObj as PostInterface[]);
      });
    }
  }, [followingIds, user]);

  return (
    <div className="max-width">
      <h1>Post List Page</h1>

      <section className="post">
        <PostCardList posts={followingPosts} />
      </section>
    </div>
  );
}
