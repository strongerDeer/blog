import { useState } from 'react';

import styles from './index.module.scss';

import Carousel from 'components/pages/home/components/Carousel';
import PostList from 'components/pages/post/components/PostList';
import Profile from 'components/pages/profile/components/Profile';
import Tab from 'components/commons/tab/Tab';

export const ALL_POST = 'all';
export const FOLLOW_POST = 'follow';
export const MY_POST = 'my';

export const tabList = [
  { id: ALL_POST, text: 'All' },
  { id: FOLLOW_POST, text: 'Following' },
  { id: MY_POST, text: 'My' },
];

export default function HomePage() {
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
          <PostList activeTab={activeTab} />
        </div>
      </div>
    </>
  );
}
