import Btn from 'components/commons/button/Btn';

import {
  arrayRemove,
  arrayUnion,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db } from 'firebaseApp';
import useFindUser from 'hooks/useFindUser';
import { UserDataInterface } from 'interface';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface FollowBtnProps {
  loginId?: string;
  profileUser?: UserDataInterface | null;
  profileId?: string;
}

export default function FollowBtn({ loginId, profileId }: FollowBtnProps) {
  const { findUser: loginUser } = useFindUser(loginId);
  const { findUser: profileUser } = useFindUser(profileId);
  const [followers, setFollowers] = useState<string[]>([]);

  const onFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (loginId && profileId) {
        // 로그인한 사용자 : 팔로잉에 추가
        const followingRef = doc(db, 'users', loginId);

        await updateDoc(followingRef, {
          followingList: arrayUnion({
            uid: profileId,
            displayName: profileUser?.displayName,
            email: profileUser?.email,
            photoURL: profileUser?.photoURL,
          }),
        });

        // 팔로우 당하는 사용자: 팔로우에 추가
        const followerRef = doc(db, 'users', profileId);
        await updateDoc(followerRef, {
          followerList: arrayUnion({
            uid: loginId,
            displayName: loginUser?.displayName,
            email: loginUser?.email,
            photoURL: loginUser?.photoURL,
          }),
        });
      }
      toast.success('팔로우 하였습니다');
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (loginId && profileId) {
        // 로그인한 사용자 : 팔로잉에 삭제
        const followingRef = doc(db, 'users', loginId);

        await updateDoc(followingRef, {
          followingList: arrayRemove({
            uid: profileId,
            displayName: profileUser?.displayName,
            email: profileUser?.email,
            photoURL: profileUser?.photoURL,
          }),
        });

        // 팔로우 당하는 사용자: 팔로우에 삭제
        const followerRef = doc(db, 'users', profileId);
        await updateDoc(followerRef, {
          followerList: arrayRemove({
            uid: loginId,
            displayName: loginUser?.displayName,
            email: loginUser?.email,
            photoURL: loginUser?.photoURL,
          }),
        });
      }
      toast.success('팔로우 취소하였습니다!');
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowers = useCallback(async () => {
    if (profileId) {
      const ref = doc(db, 'users', profileId);

      onSnapshot(ref, (doc) => {
        setFollowers([]);
        doc
          ?.data()
          ?.followerList?.map((data: any) =>
            setFollowers((prev) => (prev ? [...prev, data?.uid] : [])),
          );
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
      {loginId && followers?.includes(loginId) ? (
        <Btn onClick={onDeleteFollow}>팔로잉 취소</Btn>
      ) : (
        <Btn onClick={onFollow}>팔로잉 하기</Btn>
      )}
    </>
  );
}
