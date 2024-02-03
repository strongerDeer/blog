import Btn from 'components/commons/button/Btn';

import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'firebaseApp';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface FollowBtnProps {
  loginId: string;
  uid: string;
}

export default function FollowBtn({ loginId, uid }: FollowBtnProps) {
  const [followers, setFollowers] = useState<string[]>([]);

  const onFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (loginId) {
        // 로그인한 사용자 : 팔로잉에 추가
        const followingRef = doc(db, 'users', loginId);

        await updateDoc(followingRef, {
          followingList: arrayUnion(uid),
        });

        // 팔로우 당하는 사용자: 팔로우에 추가
        const followerRef = doc(db, 'users', uid);
        await updateDoc(followerRef, {
          followerList: arrayUnion(loginId),
        });
      }
      toast.success('팔로우 하였습니다');
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (loginId) {
        // 로그인한 사용자 : 팔로잉에 삭제
        const followingRef = doc(db, 'users', loginId);

        await updateDoc(followingRef, {
          followingList: arrayRemove(uid),
        });

        // 팔로우 당하는 사용자: 팔로우에 삭제
        const followerRef = doc(db, 'users', uid);
        await updateDoc(followerRef, {
          followerList: arrayRemove(loginId),
        });
      }
      toast.success('팔로우 취소하였습니다!');
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowers = useCallback(async () => {
    if (uid) {
      const ref = doc(db, 'users', uid);

      onSnapshot(ref, (doc) => {
        setFollowers([]);
        doc
          ?.data()
          ?.followerList?.map((data: string) =>
            setFollowers((prev) => (prev ? [...prev, data] : [])),
          );
      });
    }
  }, []);

  useEffect(() => {
    if (uid) getFollowers();
  }, [getFollowers, uid]);

  return (
    <>
      {followers?.includes(loginId) ? (
        <Btn onClick={onDeleteFollow}>팔로잉 취소</Btn>
      ) : (
        <Btn onClick={onFollow}>팔로잉 하기</Btn>
      )}
    </>
  );
}
