import { User } from '../../types/User';

export const UserInfo: React.FC<{
  user: User,
}> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
