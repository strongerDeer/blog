import { PostInterface } from "interface";
import PostCardItem from "./PostCardItem";

import styles from "./PostList.module.scss";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "contexts/AuthContext";
import Pagination from "components/commons/pagination/Pagination";
import { useSearchParams } from "react-router-dom";

const LIMIT = 2;

export default function PostList({ type }: { type?: string }) {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const currentPage = page ? parseInt(page) : 1;

  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState<PostInterface[]>([]);

  const [totalPage, setTotalPage] = useState<number | null>(null);
  /* 
  useEffect(() => {
    let postsRef = collection(db, "posts");
    let postQuery;

    switch (type) {
      case "my_post":
        postQuery = query(
          postsRef,
          where("uid", "==", user?.uid),
          orderBy("createdAt", "desc"),
          limit(LIMIT)
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
*/
  useEffect(() => {
    const fucntionData = async () => {
      //total
      const total = await getDocs(
        query(collection(db, "posts"), orderBy("createdAt", "desc"))
      );
      const totalPageNum = Math.ceil(total.docs.length / LIMIT);
      setTotalPage(totalPageNum);

      if (currentPage > totalPageNum) {
        return;
      }

      const currentLast = total.docs[(currentPage - 1) * LIMIT - 1];

      let current = query(
        collection(db, "posts"),
        orderBy("createdAt", "desc"),
        limit(LIMIT)
      );
      if (currentPage > 1) {
        current = query(
          collection(db, "posts"),
          orderBy("createdAt", "desc"),
          startAfter(currentLast),
          limit(LIMIT)
        );
      }
      onSnapshot(current, (snapshot) => {
        let dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as PostInterface[]);
      });
    };
    fucntionData();
  }, [currentPage]);
  return (
    <>
      <ul className={styles.post__list}>
        {posts?.length > 0 ? (
          posts.map((post: PostInterface) => (
            <PostCardItem key={post.id} post={post} />
          ))
        ) : (
          <p>게시글이 없습니다.</p>
        )}
      </ul>

      {totalPage && (
        <Pagination totalPage={totalPage} page={currentPage} pathname="post" />
      )}
    </>
  );
}
