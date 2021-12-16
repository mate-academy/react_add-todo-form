import { User } from '../../types/User';
import './UserInfo.scss';

type Props = {
  user: Pick<User, 'name' | 'email'>
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <div className="user">
      <p>{name}</p>
      <p>{email}</p>
    </div>
  );
};
