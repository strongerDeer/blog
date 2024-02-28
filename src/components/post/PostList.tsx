import { PostInterface } from "interface";
import PostCardItem from "./PostCardItem";

import styles from "./PostList.module.scss";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "contexts/AuthContext";

export default function PostList({ type }: { type?: string }) {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostInterface[]>([]);

  useEffect(() => {
    let postsRef = collection(db, "posts");
    let postQuery;

    switch (type) {
      case "my_post":
        postQuery = query(
          postsRef,
          where("uid", "==", user?.uid),
          orderBy("createdAt", "desc")
        );
        break;
      default:
        postQuery = query(postsRef, orderBy("createdAt", "desc"));
    }

    onSnapshot(postQuery, (snapshot) => {
      let dataObj = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc?.id,
      }));
      setPosts(dataObj as PostInterface[]);
    });
  }, [type, user?.uid]);

  return (
    <ul className={styles.post__list}>
      {posts?.length > 0 ? (
        posts.map((post: PostInterface) => (
          <PostCardItem key={post.id} post={post} />
        ))
      ) : (
        <p>게시글이 없습니다.</p>
      )}
    </ul>
  );
}
