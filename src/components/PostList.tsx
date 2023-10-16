import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './PostList.module.scss';
interface PostListProps {
  hasNavigation?: boolean;
}
export default function PostList({ hasNavigation = true }: PostListProps) {
  const [activeTab, setActiveTab] = useState(0);

  const tabList = ['전체', '나의글'];

  const changeTab = (e: any) => {
    setActiveTab(Number(e.target.value));
  };
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
        {[...Array(10)].map((e, index) => (
          <li key={index} className="post__box">
            <article>
              <Link to={`/post/${index}`}>
                <h3 className="post__title">게시글 {index}</h3>

                <div className="post__profile-box">
                  <p className="post__author">
                    <img src="" alt="" />
                    stronger.Deer
                  </p>
                  <time className="post__datte">2023.10.16 토요일</time>
                </div>
                <p className="post__content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
                  necessitatibus quod repudiandae autem illum! Doloribus eum
                  consectetur a eaque reprehenderit! Atque officia inventore
                  natus temporibus dolorem delectus ea! Eaque, magni?
                </p>
              </Link>
              <div className="post__button">
                <button type="button" className="post__edit">
                  수정
                </button>
                <button type="button" className="post__delete">
                  삭제
                </button>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </>
  );
}
