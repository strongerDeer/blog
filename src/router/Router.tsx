import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/home';
import PostListPage from '../pages/post';
import PostDetailPage from '../pages/post/detail';
import PostCreatePage from '../pages/post/create';
import PostEditPage from '../pages/post/edit';
import ProfilePage from '../pages/profile';

import ProfileEditPage from 'pages/profile/edit';
import NotificationsPage from 'pages/notifications';
import SearchPage from 'pages/search';
import SigninPage from 'pages/sign/Signin';
import SignupPage from 'pages/sign/Signup';
import { useContext } from 'react';
import AuthContext from 'context/AuthContext';
import FollowingPostListPage from 'pages/followingpost';

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
