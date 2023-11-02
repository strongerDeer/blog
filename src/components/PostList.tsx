import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from 'firebaseApp';

import AuthContext from 'context/AuthContext';
import BtnDeletePost from './atoms/BtnDeletePost';

import styles from './PostList.module.scss';

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: tabType | CategoryType;
}
type tabType = 'all' | 'my';

export type CategoryType = 'Frontend' | 'Backend' | 'Web' | 'Native';
export const CATEGORIES: CategoryType[] = [
  'Frontend',
  'Backend',
  'Web',
  'Native',
];

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
}

export default function PostList({
  hasNavigation = true,
  defaultTab = 'all',
}: PostListProps) {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState<tabType | CategoryType>(
    defaultTab,
  );
  const [posts, setPosts] = useState<PostProps[]>([]);

  const getPosts = async () => {
    setPosts([]);
    let postsRef = collection(db, 'posts');
    let postQuery;

    if (activeTab === 'my' && user) {
      // 나의글
      postQuery = query(
        postsRef,
        where('uid', '==', user?.uid),
        orderBy('createAt', 'desc'),
      );
    } else if (activeTab === 'all') {
      // 전체
      postQuery = query(postsRef, orderBy('createAt', 'desc'));
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
      setPosts((prev) => [...prev, dataObj as PostProps]);
    });
  };
  useEffect(() => {
    getPosts();
  }, [activeTab]);

  return (
    <>
      {hasNavigation && (
        <div className={styles['post__navigation']}>
          <button
            type="button"
            className={
              activeTab === 'all' ? styles['post__navigation--active'] : ''
            }
            onClick={() => setActiveTab('all')}>
            전체
          </button>
          <button
            type="button"
            className={
              activeTab === 'my' ? styles['post__navigation--active'] : ''
            }
            onClick={() => setActiveTab('my')}>
            나의 글
          </button>

          {CATEGORIES.map((category, index) => (
            <button
              key={index}
              type="button"
              className={
                activeTab === category ? styles['post__navigation--active'] : ''
              }
              onClick={() => setActiveTab(category)}>
              {category}
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
                    <time className="post__date">{post?.createAt}</time>
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
