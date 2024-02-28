import FollowList from "components/follow/FollowList";
import Profile from "components/profile/Profile";
import AuthContext from "contexts/AuthContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "firebaseApp";
import { FollowInterface } from "interface";
import { useContext, useEffect, useState } from "react";

import styles from "./MyPage.module.scss";
import classNames from "classnames";
import PostList from "components/post/PostList";
export default function MyPage() {
  const { user } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState<string>("post");
  const [followers, setFollowers] = useState<FollowInterface[]>([]);
  const [followings, setFollowings] = useState<FollowInterface[]>([]);

  useEffect(() => {
    // 팔로워
    let followerRef = collection(db, `users/${user?.uid}/followers`);
    let followerQuery = query(followerRef, orderBy("displayName", "asc"));

    onSnapshot(followerQuery, (snapshot) => {
      let dataObj = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc?.id,
      }));
      setFollowers(dataObj as FollowInterface[]);
    });

    // 팔로잉
    let followingRef = collection(db, `users/${user?.uid}/followings`);
    let followingQuery = query(followingRef, orderBy("displayName", "asc"));

    onSnapshot(followingQuery, (snapshot) => {
      let dataObj = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc?.id,
      }));
      setFollowings(dataObj as FollowInterface[]);
    });
  }, []);

  return (
    <div className="max-width">
      <Profile />

      <div className={styles.tab_wrap}>
        <button
          type="button"
          data-set="post"
          onClick={() => setActiveTab("post")}
          className={classNames(
            styles.tab_button,
            activeTab === "post" ? styles.active : ""
          )}
        >
          게시글
        </button>
        <button
          type="button"
          data-set="follower"
          onClick={() => setActiveTab("follower")}
          className={classNames(
            styles.tab_button,
            activeTab === "follower" ? styles.active : ""
          )}
        >
          팔로워 <strong>{followers?.length ? followers?.length : 0}</strong>
        </button>
        <button
          type="button"
          data-set="following"
          onClick={() => setActiveTab("following")}
          className={classNames(
            styles.tab_button,
            activeTab === "following" ? styles.active : ""
          )}
        >
          팔로잉 <strong>{followings?.length ? followings?.length : 0}</strong>
        </button>
      </div>

      {activeTab === "post" && (
        <>
          <h2>게시글</h2>
          <PostList type="my_post" />
        </>
      )}

      {activeTab === "follower" && user?.uid && (
        <FollowList users={followers} type="followers" />
      )}
      {activeTab === "following" && user?.uid && (
        <FollowList users={followings} type="followings" />
      )}
    </div>
  );
}
