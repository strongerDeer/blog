import Carousel from 'pages/home/components/Carousel';
import PostList from 'pages/post/components/PostList';
import PostTab from 'pages/post/components/PostTab';

export default function HomePage() {
  return (
    <>
      <Carousel />
      <div className="max-width">
        <PostList hasTab={true} />
      </div>
    </>
  );
}
