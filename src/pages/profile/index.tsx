import PostList from 'pages/post/components/PostList';
import Profile from 'pages/profile/components/Profile';

export default function ProfilePage() {
  return (
    <div className="max-width">
      Profile Page
      <Profile />
      <PostList />
    </div>
  );
}
