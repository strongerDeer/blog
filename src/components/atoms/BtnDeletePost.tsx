import { useLocation, useNavigate } from 'react-router-dom';

// firebase
import { db } from 'firebaseApp';
import { deleteDoc, doc } from 'firebase/firestore';

// toast
import { toast } from 'react-toastify';

export default function BtnDeletePost({ id, getPosts }: any) {
  const path = useLocation().pathname;
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirm = window.confirm('해당 게시글을 삭제하시겠습니까?');
    if (confirm && id) {
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
      삭제
    </button>
  );
}
