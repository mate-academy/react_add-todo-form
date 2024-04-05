import { type User } from '../../App';

export const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
