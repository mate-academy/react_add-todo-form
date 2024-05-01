import { User } from '../../types/user';

export const UserInfo: React.FC<{ user: User }> = ({ user }) => {
  const { email, name } = user;

  return (
    <a href={`mailto:${email}`} className="UserInfo">
      {name}
    </a>
  );
};
