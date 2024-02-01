import { useLocation, useNavigate } from 'react-router-dom';

// firebase
import { db, storage } from 'firebaseApp';
import { deleteDoc, doc } from 'firebase/firestore';

// toast
import { toast } from 'react-toastify';
import { deleteObject, ref } from 'firebase/storage';
import { PostInterface } from 'interface';
import SVGDelete from 'components/svg/SVGDelete';

export const postDelete = async (post: PostInterface) => {
  const { id, imgUrl } = post;
  const confirm = window.confirm('해당 게시글을 삭제하시겠습니까?');
  if (confirm && id) {
    // 이미지 먼저 삭제
    const imageRef = ref(storage, imgUrl);

    if (imgUrl) {
      deleteObject(imageRef).catch((error) => {
        console.log(error);
      });
    }
    // 내용 삭제
    await deleteDoc(doc(db, 'posts', id));
    toast.success('삭제되었습니다.');
    return true;
  }
  return false;
};

export default function BtnDeletePost({ post }: any) {
  const navigate = useNavigate();
  const pathname = useLocation().pathname;

  const handleDeletePost = async () => {
    const isDel = await postDelete(post);
    if (isDel) {
      if (pathname.includes('profile')) {
        navigate('/profile');
      } else if (pathname.includes('post')) {
        navigate('/post');
      } else {
        navigate('/');
      }
    }
  };
  return (
    <button type="button" className="post__delete" onClick={handleDeletePost}>
      <SVGDelete />
      <span className="a11y-hidden">삭제</span>
    </button>
  );
}
