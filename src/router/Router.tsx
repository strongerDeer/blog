import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../components/pages/home';
import PostListPage from '../components/pages/post';
import PostDetailPage from '../components/pages/post/detail';
import PostCreatePage from '../components/pages/post/create';
import PostEditPage from '../components/pages/post/edit';
import ProfilePage from '../components/pages/profile';

import ProfileEditPage from 'components/pages/profile/edit';
import NotificationsPage from 'components/pages/notifications';
import SearchPage from 'components/pages/search';
import SigninPage from 'components/pages/sign/Signin';
import SignupPage from 'components/pages/sign/Signup';
import { useContext } from 'react';
import AuthContext from 'contexts/AuthContext';
import FollowingPostListPage from 'components/pages/followingpost';

interface RouterProps {
  isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/" element={<HomePage />} />

            {/* Post */}
            <Route path="/post" element={<PostListPage />} />
            <Route path="/post/:id" element={<PostDetailPage />} />
            <Route path="/post/new" element={<PostCreatePage />} />
            <Route path="/post/edit/:id" element={<PostEditPage />} />

            {/* Profile */}
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/edit" element={<ProfileEditPage />} />
            <Route path="/profile/:id" element={<>프로필 보기</>} />

            {/* other */}
            <Route path="/follower" element={<>팔로우 리스트</>} />
            <Route path="/following" element={<>팔로잉 리스트</>} />
            <Route path="/followingpost" element={<FollowingPostListPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/search" element={<SearchPage />} />

            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        ) : (
          <>
            <Route path="/signin" element={<SigninPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="*" element={<SigninPage />} />
          </>
        )}
      </Routes>
    </>
  );
}
