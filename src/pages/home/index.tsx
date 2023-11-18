import Carousel from 'components/Carousel';
import PostList from 'components/PostList';
import PostTab from 'components/organisms/PostTab';

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
