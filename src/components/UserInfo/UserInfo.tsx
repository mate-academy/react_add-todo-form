import { User } from '../../types';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a href={`mailto:${user.email}`} className="UserInfo UserInfo__link">
      {user.name}
    </a>
  );
};
