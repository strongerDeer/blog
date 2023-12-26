import Carousel from 'components/pages/home/components/Carousel';
import PostList from 'components/pages/post/components/PostList';

import Profile from 'components/pages/profile/components/Profile';

import styles from './index.module.scss';
import Tab from 'components/commons/tab/Tab';
import { useState } from 'react';
import useUnsplashImages from 'hooks/useUnsplashImages';

export const ALL_POST = 'all';
export const MY_POST = 'my';
export const tabList = [
  { id: ALL_POST, text: '전체' },
  { id: MY_POST, text: '나의글' },
  { id: 'Frontend', text: 'Frontend' },
  { id: 'Backend', text: 'Backend' },
  { id: 'Web', text: 'Web' },
  { id: 'Native', text: 'Native' },
];

export default function HomePage() {
  const unsplash = useUnsplashImages();
  const [activeTab, setActiveTab] = useState<string>(ALL_POST);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = `${e.currentTarget.dataset.id}`;
    setActiveTab(targetId);
  };

  return (
    <>
      <Carousel />
      <div className={styles.wrap}>
        <Profile />

        <div>
          <Tab tabList={tabList} activeTab={activeTab} onClick={onClick} />

          {unsplash.map((img, index) => (
            <div key={index}>
              <img src={img && img.urls?.small} />
            </div>
          ))}
          <PostList activeTab={activeTab} />
        </div>
      </div>
    </>
  );
}
