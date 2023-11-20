import PostForm from 'pages/post/components/PostForm';

import { doc, getDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PostInterface } from 'types/Post';

export default function PostEditPage() {
  const [post, setPost] = useState<PostInterface | null>(null);
  const params = useParams();

  const getPost = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);

      setPost({ id: docSnap.id, ...(docSnap.data() as PostInterface) });
    }
  };

  useEffect(() => {
    if (params?.id) getPost(params?.id);
  }, [params?.id]);

  return (
    <>
      <h1>Post Edit Page</h1>

      <PostForm post={post} />
    </>
  );
}
