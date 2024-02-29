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
          나의 게시글
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
          팔로워
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
          팔로잉
        </button>
      </div>

      {activeTab === "post" && (
        <>
          <h2>나의 게시글</h2>
          <PostList type="my_post" />
        </>
      )}

      {activeTab === "follower" && user?.uid && <FollowList type="followers" />}
      {activeTab === "following" && user?.uid && (
        <FollowList type="followings" />
      )}
    </div>
  );
}
