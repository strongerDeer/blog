import Btn from "components/commons/button/Btn";

import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "firebaseApp";
import { UserDataInterface } from "interface";

import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

interface FollowBtnProps {
  loginId?: string;
  profileUser?: UserDataInterface | null;
  profileId?: string;
}

export default function FollowBtn({ loginId, profileId }: FollowBtnProps) {
  const [isFollow, setIsFollow] = useState<boolean>(false);

  const onFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (loginId && profileId) {
        // 로그인한 사용자 : 팔로잉에 추가
        await setDoc(
          doc(db, `users/${loginId}`),
          {
            followings: arrayUnion(profileId),
          },
          { merge: true }
        );

        // 팔로우 당하는 사용자: 팔로우에 추가
        await setDoc(
          doc(db, `users/${profileId}`),
          {
            followers: arrayUnion(loginId),
          },
          { merge: true }
        );

        // 팔로우 당하는 사용자: 알림생성
        await setDoc(
          doc(db, `users/${profileId}`, `notifications/${loginId}`),
          {
            createdAt: new Date()?.toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
            isRead: false,
            uid: profileId,
            url: `/profile/${loginId}`,
            type: "follow",
            author: loginId,
          }
        );
      }

      toast.success("팔로우 하였습니다");
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const confirm = window.confirm("팔로우를 취소할까요?");
    if (confirm) {
      try {
        if (loginId && profileId) {
          // 로그인한 사용자 : 팔로잉에서 삭제
          const followingRef = doc(db, `users/${loginId}`);
          await updateDoc(followingRef, {
            followings: arrayRemove(profileId),
          });

          // 팔로우 당하는 사용자: 팔로우에 삭제
          const followersRef = doc(db, `users/${profileId}`);
          await updateDoc(followersRef, {
            followings: arrayRemove(loginId),
          });
        }
        // 알림 삭제
        if (loginId) {
          await deleteDoc(doc(db, `users/${profileId}/notifications`, loginId));
        }
        toast.success("팔로우 취소하였습니다!");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getFollowers = useCallback(async () => {
    if (profileId) {
      const ref = doc(db, `users/${loginId}`);
      onSnapshot(ref, (docSnap) => {
        const followArr = docSnap.data()?.followings;
        setIsFollow(followArr?.includes(profileId));
      });
    }
  }, []);

  useEffect(() => {
    if (profileId) {
      getFollowers();
    }
  }, [getFollowers, profileId]);

  return (
    <>
      {isFollow ? (
        <Btn onClick={onDeleteFollow}>팔로잉 취소</Btn>
      ) : (
        <Btn onClick={onFollow} fillPrimary>
          팔로잉 하기
        </Btn>
      )}
    </>
  );
}
