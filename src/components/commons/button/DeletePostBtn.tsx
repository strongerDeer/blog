import { useLocation, useNavigate } from 'react-router-dom';

// firebase
import { db, storage } from 'firebaseApp';
import { deleteDoc, doc } from 'firebase/firestore';

// toast
import { toast } from 'react-toastify';
import { deleteObject, ref } from 'firebase/storage';
import SVGDelete from '../SVG/SVGDelete';

export default function BtnDeletePost({ id, getPosts, imgUrl }: any) {
  const path = useLocation().pathname;
  const navigate = useNavigate();

  const handleDelete = async () => {
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

      if (path.includes(id)) {
        navigate('/post');
      } else {
        getPosts();
      }
    }
  };
  return (
    <button type="button" className="post__delete" onClick={handleDelete}>
      <SVGDelete />
      <span className="a11y-hidden">삭제</span>
    </button>
  );
}
