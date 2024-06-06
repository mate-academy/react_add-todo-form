import { User } from '../../Types/User';

interface Props {
  user?: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={user?.email}>
      {user?.name}
    </a>
  );
};
