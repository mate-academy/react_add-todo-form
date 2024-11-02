import { User } from '../../types/User';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo subtitle" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
