import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { collection, getDocs } from 'firebase/firestore';
import { db } from 'firebaseApp';

import AuthContext from 'context/AuthContext';
import BtnDeletePost from './atoms/BtnDeletePost';

import styles from './PostList.module.scss';

interface PostListProps {
  hasNavigation?: boolean;
}

export interface PostProps {
  id?: string;
  title: string;
  email: string;
  summary: string;
  content: string;
  createAt: string;
  updateAt: string;
  uid: string;
}

const tabList = ['전체', '나의글'];

export default function PostList({ hasNavigation = true }: PostListProps) {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<number>(0);
  const [posts, setPosts] = useState<PostProps[]>([]);

  const changeTab = (e: any) => {
    setActiveTab(e.target.value);
  };

  const getPosts = async () => {
    const datas = await getDocs(collection(db, 'posts'));
    setPosts([]);
    datas.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {hasNavigation && (
        <div className={styles['post__navigation']}>
          {tabList.map((tab, index) => (
            <button
              key={index}
              type="button"
              className={
                activeTab === index ? styles['post__navigation--active'] : ''
              }
              value={index}
              onClick={changeTab}>
              {tab}
            </button>
          ))}
        </div>
      )}
      <ul className="post__list">
        {posts?.length > 0 ? (
          posts?.map((post, index) => (
            <li key={post && post?.id} className="post__box">
              <article>
                <Link to={`/post/${post?.id}`}>
                  <h3 className="post__title">{post?.title}</h3>
                  <div className="post__profile-box">
                    <p className="post__author">
                      <img src="" alt="" />
                      {post?.email}
                    </p>
                    <time className="post__datte">{post?.createAt}</time>
                  </div>
                  <p className="post__content">{post?.content}</p>
                </Link>

                {user?.email === post?.email && (
                  <div className="post__button">
                    <Link to={`/post/edit/${post?.id}`} className="post__edit">
                      수정
                    </Link>

                    <BtnDeletePost id={post?.id} getPosts={getPosts} />
                  </div>
                )}
              </article>
            </li>
          ))
        ) : (
          <p>게시글이 없습니다.</p>
        )}
      </ul>
    </>
  );
}
