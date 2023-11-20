import { useContext, useEffect, useState } from 'react';

// firebase

import { db } from 'firebaseApp';

import AuthContext from 'context/AuthContext';

import BtnLogout from '../../../components/commons/button/SignoutBtn';
import PostList from '../../post/components/PostList';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';

interface ProfileProps {
  image?: string;
  nickname?: string;
  email?: string;
  createAt?: string;
  uid?: string;
  id?: string;
}
export default function Profile() {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState<ProfileProps>();

  const getProfile = async () => {
    let profileRef = collection(db, 'users');
    let profileQuery = query(profileRef, where('uid', '==', user?.uid));
    const datas = await getDocs(profileQuery);

    datas.forEach((doc) => {
      const dataObj = { ...doc.data(), id: doc.id };
      setProfile(dataObj);
    });
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <section className="profile__section">
      <img src={profile?.image} alt="" />
      <p>{profile?.email}</p>
      <p>{profile?.nickname}</p>

      <BtnLogout />
      <PostList />
    </section>
  );
}
