import Btn from './Btn';
import { useCallback, useContext, useEffect, useState } from 'react';
import AuthContext from 'contexts/AuthContext';
import { db } from 'firebaseApp';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

interface FollowingProps {
  uid: string;
}

interface UserProps {
  id: string;
}

export default function FollowBtn({ uid }: FollowingProps) {
  const { user } = useContext(AuthContext);
  const [followers, setFollowers] = useState<string[]>([]);

  const onClickFollow = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (user?.uid) {
        // 로그인한 사용자: 팔로잉
        const followingRef = doc(db, 'following', user?.uid);
        await setDoc(
          followingRef,
          {
            users: arrayUnion({ id: uid }),
          },
          {
            merge: true,
          },
        );

        // 팔로우 당하는 사람
        const followerRef = doc(db, 'follower', uid);
        await setDoc(
          followerRef,
          {
            users: arrayUnion({ id: user?.uid }),
          },
          { merge: true },
        );
      }

      // 팔로잉 알림 생성
      await addDoc(collection(db, 'notifications'), {
        createdAt: new Date()?.toLocaleDateString('ko', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        uid: uid,
        isRead: false,
        url: `/profile/${user?.uid}`,
        type: 'following',
        content: `${user?.displayName || user?.email}`,
      });

      toast.success('팔로우 하였습니다');
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDeleteFollow = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();

    try {
      if (user?.uid) {
        // 로그인한 사용자
        const followingRef = doc(db, 'following', user?.uid);
        await updateDoc(followingRef, {
          users: arrayRemove({ id: uid }),
        });

        // 팔로우 당하는 사람
        const followerRef = doc(db, 'follower', uid);
        await updateDoc(followerRef, {
          users: arrayRemove({ id: user?.uid }),
        });
      }
      toast.success('팔로우를 취소하였습니다');
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowers = useCallback(async () => {
    if (uid) {
      const ref = doc(db, 'follower', uid);
      onSnapshot(ref, (doc) => {
        setFollowers([]);
        doc
          ?.data()
          ?.users?.map((user: UserProps) =>
            setFollowers((prev) => (prev ? [...prev, user?.id] : [])),
          );
      });
    }
  }, []);

  useEffect(() => {
    if (uid) getFollowers();
  }, [getFollowers, uid]);

  return uid && user && user?.uid !== uid ? (
    followers?.includes(user?.uid) ? (
      <Btn bgNone={true} onClick={onClickDeleteFollow}>
        팔로잉 취소
      </Btn>
    ) : (
      <Btn bgNone={false} onClick={onClickFollow}>
        팔로잉{' '}
      </Btn>
    )
  ) : null;
}
