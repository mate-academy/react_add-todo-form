import { User } from '../../types/User';
import './UserInfo.css';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <>
      <p className="user-name">
        <b>Name: </b>
        {name}
      </p>
      <p className="user-name">
        <b>Email: </b>
        {email}
      </p>
    </>
  );
};
