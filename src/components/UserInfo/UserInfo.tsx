import { User } from '../../types/types';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const isUserAvailable = user !== null;

  if (!isUserAvailable) {
    return null;
  }

  const { name, email } = user;
  const mailToLink = `mailto:${email}`;

  return (
    <a className="UserInfo" href={mailToLink}>
      {name}
    </a>
  );
};
