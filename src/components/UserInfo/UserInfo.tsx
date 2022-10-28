import { User } from '../../react-app-env';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a data-id={user.id} href={`mailto:${user.email}`} className="UserInfo">
    {user.name}
  </a>
);
