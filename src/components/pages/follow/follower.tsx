import { NO_IMG } from 'constants/noimg';
import useGetFollow from 'hooks/useGetFollow';
import { Link } from 'react-router-dom';

export default function FollowerListPage() {
  const followers = useGetFollow('follower');

  return (
    <div className="min-width">
      <h2>Follower</h2>
      <ul>
        {followers ? (
          followers.map((follower, index) => (
            <li key={index}>
              <Link to="">
                <img src={follower.photoURL || NO_IMG} alt="" />
                <strong> {follower.displayName}</strong>{' '}
                <span>{follower.email}</span>
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
