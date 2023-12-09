import Tab from 'components/commons/tab/Tab';
import { ALL_POST, tabList } from 'components/pages/home';
import PostList from 'components/pages/post/components/PostList';
import { useState } from 'react';

export default function PostListPage() {
  const [activeTab, setActiveTab] = useState<string>(ALL_POST);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const targetId = `${e.currentTarget.dataset.id}`;
    setActiveTab(targetId);
  };

  return (
    <div className="max-width">
      <h1>Post List Page</h1>

      <div>
        <Tab tabList={tabList} activeTab={activeTab} onClick={onClick} />
        <PostList activeTab={activeTab} />
      </div>
    </div>
  );
}
