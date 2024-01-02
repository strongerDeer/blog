import { NO_IMG } from 'constants/noimg';
import useGetFollow from 'hooks/useGetFollow';
import { Link } from 'react-router-dom';

export default function FollowingListPage() {
  const followings = useGetFollow('following');
  return (
    <div className="min-width">
      <h2>Followings</h2>
      <ul>
        {followings ? (
          followings.map((following, index) => (
            <li key={index}>
              <Link to="">
                <img src={following.photoURL || NO_IMG} alt="" />
                <strong> {following.displayName}</strong>{' '}
                <span>{following.email}</span>
              </Link>
            </li>
          ))
        ) : (
          <p>팔로워가 없어요...</p>
        )}
      </ul>
    </div>
  );
}
