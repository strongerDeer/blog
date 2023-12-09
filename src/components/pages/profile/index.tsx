import { MY_POST } from 'components/pages/home';
import PostList from 'components/pages/post/components/PostList';
import Profile from 'components/pages/profile/components/Profile';
import { useState } from 'react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<string>(MY_POST);

  return (
    <div className="max-width">
      Profile Page
      <Profile />
      <button
        type="button"
        onClick={() => setActiveTab(MY_POST)}
        className={activeTab === MY_POST ? 'active' : ''}>
        나의글
      </button>
      <button
        type="button"
        onClick={() => setActiveTab('like')}
        className={activeTab === 'like' ? 'active' : ''}>
        좋아요한 글
      </button>
      <PostList activeTab={activeTab} />
    </div>
  );
}
