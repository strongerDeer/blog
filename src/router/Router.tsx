import { Route, Routes } from 'react-router-dom';

import MyPage from 'pages/profile/MyPage';
import { useContext } from 'react';
import AuthContext from 'contexts/AuthContext';

import LoginPage from 'pages/login/LoginPage';
import SignupPage from 'pages/login/SignupPage';
import ProfilePage from 'pages/profile/ProfilePage';
import ProfileEditPage from 'pages/profile/ProfileEditPage';
import PostCreatePage from 'pages/post/PostCreatePage';
import PostListPage from 'pages/post/PostListPage';
import PostEditPage from 'pages/post/PostEditPage';
import PostViewPage from 'pages/post/PostViewPage';
import FollowingListPage from 'pages/follow/FollowingListPage';
import FollowerListPage from 'pages/follow/FollowerListPage';
import HomePage from 'pages/home/HomePage';

export default function Router() {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {user ? (
        <>
          {/* 로그인 */}

          {/* 프로필 */}
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />

          {/* 게시물 */}
          <Route path="/post/create" element={<PostCreatePage />} />
          <Route path="/post/edit/:id" element={<PostEditPage />} />

          {/* 알림 */}
          <Route path="/notifications" element={<>알림 목록</>} />

          {/* 팔로우 */}
          {user.uid && (
            <>
              <Route
                path="/follwers"
                element={<FollowerListPage loginId={user.uid} />}
              />
              <Route
                path="/follwings"
                element={<FollowingListPage loginId={user.uid} />}
              />
            </>
          )}
        </>
      ) : (
        <>
          {/* 미로그인 */}
          {/* 회원 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="*" element={<LoginPage />} />
        </>
      )}
      {/* 게시물 */}
      <Route path="/post" element={<PostListPage />} />
      <Route path="/post/:id" element={<PostViewPage />} />

      {/* 검색 */}
      <Route path="/search" element={<>검색</>} />
      <Route path="*" element={<>404페이지</>} />
    </Routes>
  );
}
