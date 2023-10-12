import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/home';
import PostListPage from '../pages/posts';
import PostDetailPage from '../pages/posts/detail';
import PostCreatePage from '../pages/posts/create';
import PostEditPage from '../pages/posts/edit';
import ProfilePage from '../pages/profile';
import LoginPage from '../pages/login';
import SignupPage from '../pages/signup';

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post" element={<PostListPage />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/post/new" element={<PostCreatePage />} />
        <Route path="/post/edit/:id" element={<PostEditPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </>
  );
}
