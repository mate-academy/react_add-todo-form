import { User } from '../../types/User';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo message-body" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
