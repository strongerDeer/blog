import PostCardItem from 'components/post/PostCardItem';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostInterface } from 'interface';
import { useEffect, useState } from 'react';

export default function PostListPage() {
  const [posts, setPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    let postsRef = collection(db, 'posts');
    let postQuery = query(postsRef, orderBy('createdAt', 'desc'));

    onSnapshot(postQuery, (snapshot) => {
      let dataObj = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc?.id,
      }));
      setPosts(dataObj as PostInterface[]);
    });
  }, []);

  return (
    <>
      PostPage
      <ul>
        {posts?.length > 0 ? (
          posts.map((post: any) => (
            <>
              {post.title}
              <PostCardItem key={post.id} post={post} />
            </>
          ))
        ) : (
          <p>게시글이 없습니다.</p>
        )}
      </ul>
    </>
  );
}
