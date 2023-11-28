import Carousel from 'pages/home/components/Carousel';
import PostList from 'pages/post/components/PostList';

import Profile from 'pages/profile/components/Profile';

import styles from './index.module.scss';
export default function HomePage() {
  return (
    <>
      <Carousel />
      <div className={styles.wrap}>
        <Profile />
        <PostList hasTab={true} />
      </div>
    </>
  );
}
