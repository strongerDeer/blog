import PostForm from 'components/pages/post/components/PostForm';
import Today from './components/Today';

export default function PostCreatePage() {
  return (
    <>
      <Today />
      <section className="container">
        <PostForm />
      </section>
    </>
  );
}
