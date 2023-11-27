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

interface RouterProps {
  isAuthenticated: boolean;
}

export default function Router({ isAuthenticated }: RouterProps) {
  const { user } = useContext(AuthContext);
  const loginProvider = user?.providerData[0].providerId;

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
            {/* {!(
              loginProvider === 'google.com' || loginProvider === 'github.com'
            ) && <Route path="/profile/edit" element={<ProfileEditPage />} />} */}

            {/* other */}
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
