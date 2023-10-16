import PostList from './PostList';

export default function Profile() {
  return (
    <div className="profile__section">
      <img src="" alt="" />
      <p>abc@gmail.com</p>
      <p>홍길동</p>
      <button type="button">로그아웃</button>
      <PostList hasNavigation={false} />
    </div>
  );
}
