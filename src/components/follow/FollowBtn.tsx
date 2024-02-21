import Btn from 'components/commons/button/Btn';

import { deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from 'firebaseApp';
import useFindUser from 'hooks/useFindUser';
import { UserDataInterface } from 'interface';

import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

interface FollowBtnProps {
  loginId?: string;
  profileUser?: UserDataInterface | null;
  profileId?: string;
}

export default function FollowBtn({ loginId, profileId }: FollowBtnProps) {
  const { findUser: loginUser } = useFindUser(loginId);
  const { findUser: profileUser } = useFindUser(profileId);

  const [isFollow, setIsFollow] = useState<boolean>(false);
  const [followUid, setFollowUid] = useState<string | null>(null);

  const onFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const timeId = new Date().getTime() + '';

    try {
      if (loginId && profileId) {
        // 로그인한 사용자 : 팔로잉에 추가
        await setDoc(doc(db, `users/${loginId}`, `followings/${profileId}`), {
          uid: timeId,
          displayName: profileUser?.displayName,
          email: profileUser?.email,
          photoURL: profileUser?.photoURL,
        });

        // 팔로우 당하는 사용자: 팔로우에 추가
        await setDoc(doc(db, `users/${profileId}`, `followers/${loginId}`), {
          uid: timeId,
          displayName: loginUser?.displayName,
          email: loginUser?.email,
          photoURL: loginUser?.photoURL,
        });

        // 팔로우 당하는 사용자: 알림생성
        await setDoc(doc(db, `users/${profileId}`, `notifications/${timeId}`), {
          createdAt: new Date()?.toLocaleDateString('ko', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }),
          isRead: false,
          uid: profileId,
          url: `/profile/${loginId}`,
          type: 'follow',
          author: loginId,
        });
      }

      toast.success('팔로우 하였습니다');
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const confirm = window.confirm('팔로우를 취소할까요?');
    if (confirm) {
      try {
        if (loginId && profileId) {
          // 로그인한 사용자 : 팔로잉에서 삭제
          await deleteDoc(doc(db, `users/${loginId}/followings`, profileId));

          // 팔로우 당하는 사용자: 팔로우에 삭제
          await deleteDoc(doc(db, `users/${profileId}/followers`, loginId));
        }
        // 알림 삭제
        if (followUid) {
          await deleteDoc(
            doc(db, `users/${profileId}/notifications`, followUid),
          );
        }
        toast.success('팔로우 취소하였습니다!');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const getFollowers = useCallback(async () => {
    if (profileId) {
      const ref = doc(db, `users/${profileId}`, `followers/${loginId}`);
      onSnapshot(ref, (docSnap) => {
        console.log();
        setIsFollow(docSnap.exists());
        setFollowUid(docSnap.data()?.uid);
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
