import { useContext, useEffect, useState } from 'react';

import styles from './Profile.module.scss';

// firebase
import AuthContext from 'contexts/AuthContext';

// lib
import classNames from 'classnames';

import { onSignOut } from 'hooks/signOut';
import { NO_IMG } from 'constants/noimg';
import Btn from 'components/commons/button/Btn';
import FollowBtn from 'components/commons/button/FollowBtn';
import SVGSignout from 'components/commons/SVG/SVGSignout';
import SVGProfile from 'components/commons/SVG/SVGProfile';
import { Link } from 'react-router-dom';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import { PostInterface } from 'types/Post';

import { FollowerInterface } from 'types/Follower';
import { FollowingInterface } from 'types/Following';

interface ProfileProps {
  image?: string;
  nickname?: string;
  email?: string;
  createdAt?: string;
  uid?: string;
  id?: string;
}
export default function Profile() {
  const { user } = useContext(AuthContext);

  const [posts, setPosts] = useState<PostInterface[]>([]);
  const [followers, setFollowers] = useState<FollowerInterface[]>([]);
  const [followings, setFollowings] = useState<FollowingInterface[]>([]);

  const getFollowers = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'follower', id);
      onSnapshot(docRef, (doc) => {
        setFollowers(doc.data()?.users as FollowerInterface[]);
      });
    }
  };

  const getFollowings = async (id: string) => {
    if (id) {
      const docRef = doc(db, 'following', id);
      onSnapshot(docRef, (doc) => {
        setFollowings(doc.data()?.users as FollowingInterface[]);
      });
    }
  };

  useEffect(() => {
    // 나의글 가져오기
    if (user) {
      let postsRef = collection(db, 'posts');
      let postQuery = query(
        postsRef,
        where('uid', '==', user?.uid),
        orderBy('createdAt', 'desc'),
      );

      onSnapshot(postQuery, (snapshot) => {
        let dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setPosts(dataObj as PostInterface[]);
      });

      // 팔로워 가져오기
      getFollowers(user?.uid);

      // 팔로잉 가져오기
      getFollowings(user?.uid);
    }
  }, []);

  return (
    <section className={classNames('profile', styles.profile__section)}>
      <div>
        <h3>About Me</h3>
        <img
          src={user?.photoURL ? user.photoURL : NO_IMG}
          alt=""
          className={styles.user__img}
        />
        <p className={styles.user__name}>{user?.displayName}</p>

        <p className={styles.user__email}>{user?.email}</p>
      </div>

      <div className={styles.count}>
        <Btn href="/" bgNone={true}>
          게시글 <strong>{posts.length}</strong>
        </Btn>
        <Btn href="/follower" bgNone={true}>
          팔로우 <strong>{followers.length}</strong>
        </Btn>
        <Btn href="/following" bgNone={true}>
          팔로잉 <strong>{followings.length}</strong>
        </Btn>
      </div>

      <div className={styles.btn__group}>
        <Link
          to="/profile/edit"
          title="프로필 수정"
          className={styles.btn_profileEdit}>
          <SVGProfile />
          <span className="a11y-hidden"> 프로필 수정</span>
        </Link>

        <button
          type="button"
          onClick={onSignOut}
          title="로그아웃"
          className={styles.btn_logout}>
          <SVGSignout />
          <span className="a11y-hidden">로그아웃</span>
        </button>
      </div>
    </section>
  );
}
