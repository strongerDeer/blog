import { NO_IMG } from "constants/index";
import { UserDataInterface } from "interface";
import { Link } from "react-router-dom";

import styles from "./FollowList.module.scss";
import FollowBtn from "./FollowBtn";
import { useContext, useEffect, useState } from "react";
import AuthContext from "contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "firebaseApp";

export default function FollowList({ type }: { type: string }) {
  const { user: loginUser } = useContext(AuthContext);
  const [followArr, setFollowArr] = useState<string[]>([]);
  const [followsData, setFollowsData] = useState<UserDataInterface[] | null>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!loginUser?.uid) return;

      const followRef = doc(db, `users/${loginUser.uid}`);
      const snapshot = await getDoc(followRef);

      let followArr;
      if (type === "followers") {
        followArr = snapshot.data()?.followers || [];
      } else {
        followArr = snapshot.data()?.followings || [];
      }

      const usersData = [];

      for (const follower of followArr) {
        const userDoc = await getDoc(doc(db, "users", follower));

        if (userDoc.exists()) {
          usersData.push({ ...userDoc.data(), id: follower });
        }
      }
      setFollowsData(usersData);
      setFollowArr([...followArr]);
    };

    fetchData();
  }, [loginUser?.uid, type]);

  return (
    <div className={styles.follow_wrap}>
      <div>
        <h2 className={styles.title}>
          {type} <strong>{followArr.length}</strong>
        </h2>

        {followArr.length > 0 ? (
          <ul className={styles.follow_list}>
            {followsData?.map((follow, index) => (
              <li key={index} className={styles.follow_item}>
                <Link to={`/profile/${follow?.id}`}>
                  <img src={follow?.photoURL || NO_IMG} alt="" />
                  <span className={styles.user_text}>
                    <strong>{follow?.displayName}</strong>
                    <span>{follow?.email}</span>
                  </span>
                </Link>

                {loginUser?.uid && follow?.id && (
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
