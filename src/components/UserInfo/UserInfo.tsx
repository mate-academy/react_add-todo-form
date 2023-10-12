import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user: { name, email } }) => {
  const userName = name || '';
  const userEmail = email || '';

  return (
    <a className="UserInfo" href={`mailto:${userEmail || '#'}`}>
      {userName}
    </a>
  );
};
