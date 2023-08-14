import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo button is-info is-small is-light" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
