import { User } from '../../types';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }): JSX.Element | null => {
  if (user) {
    return (
      <a className="UserInfo" href={`mailto:${user.email}`}>
        {user.name}
      </a>
    );
  }

  return null;
};
