import { Route, Routes } from 'react-router-dom';

import LoginPage from 'pages/login/LoginPage';
import SignupPage from 'pages/login/SignupPage';
import { useContext } from 'react';
import { AuthContext } from 'context/AuthContext';

export default function Router() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<>Home</>} />

      {isAuthenticated ? (
        <>
          {/* 로그인 */}

          {/* 프로필 */}
          <Route path="/profile" element={<>나의 프로필</>} />
          <Route path="/profile/create" element={<>프로필 생성</>} />
          <Route path="/profile/edit" element={<>프로필 수정</>} />
          <Route path="/profile/:id" element={<>유저 프로필</>} />

          {/* 게시물 */}
          <Route path="/post/create" element={<>게시물 생성</>} />
          <Route path="/post/edit/:id" element={<>게시물 수정</>} />

          {/* 알림 */}
          <Route path="/notifications" element={<>알림 목록</>} />
        </>
      ) : (
        <>
          {/* 미로그인 */}
          {/* 회원 */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </>
      )}
      {/* 게시물 */}
      <Route path="/posts" element={<>게시물 리스트</>} />
      <Route path="/post/:id" element={<>게시물 상세</>} />

      {/* 팔로우 */}
      <Route path="/follwers" element={<>팔로우 목록</>} />
      <Route path="/follwings" element={<>팔로잉 목록</>} />

      {/* 검색 */}
      <Route path="/search" element={<>검색</>} />
    </Routes>
  );
}
