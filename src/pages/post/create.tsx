import PostForm from 'pages/post/components/PostForm';
import Today from './components/Today';

export default function PostCreatePage() {
  return (
    <>
      <Today />
      <section className="form-container">
        <PostForm />
      </section>
    </>
  );
}
