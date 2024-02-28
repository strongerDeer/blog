import { NO_IMG } from "constants/index";
import { FollowInterface, UserDataInterface } from "interface";
import { Link } from "react-router-dom";

import styles from "./FollowList.module.scss";
import FollowBtn from "./FollowBtn";
import { useContext, useEffect, useState } from "react";
import AuthContext from "contexts/AuthContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "firebaseApp";

export default function FollowList({
  users,
  type,
}: {
  users: UserDataInterface[];
  type: string;
}) {
  const { user: loginUser } = useContext(AuthContext);

  const [follow, setFollow] = useState<FollowInterface[]>([]);

  useEffect(() => {
    if (loginUser?.uid) {
      let followRef;

      if (type === "followers") {
        followRef = collection(db, `users/${loginUser.uid}/followers`);
      } else {
        followRef = collection(db, `users/${loginUser.uid}/followings`);
      }
      let followQuery = query(followRef, orderBy("displayName", "asc"));

      onSnapshot(followQuery, (snapshot) => {
        let dataObj = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc?.id,
        }));
        setFollow(dataObj as FollowInterface[]);
      });
    }
  }, [loginUser?.uid, type]);

  return (
    <div className={styles.follow_wrap}>
      <div>
        <h2 className={styles.title}>
          {type} <strong>{follow.length}</strong>
        </h2>
        {follow.length > 0 ? (
          <ul className={styles.follow_list}>
            {follow.map((follow, index) => (
              <li key={index} className={styles.follow_item}>
                <Link to={`/profile/${follow?.id}`}>
                  <img src={follow?.photoURL || NO_IMG} alt="" />
                  <span className={styles.user_text}>
                    <strong>{follow?.displayName}</strong>
                    <span>{follow?.email}</span>
                  </span>
                </Link>

                {/* 수정필요 */}
                {loginUser?.uid && (
                  <FollowBtn loginId={loginUser?.uid} profileId={follow?.id} />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>{type === "followings" ? "팔로잉" : "팔로워"} 유저가 없어요</p>
        )}
      </div>
    </div>
  );
}
