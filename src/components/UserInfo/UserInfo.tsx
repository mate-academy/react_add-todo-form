import { Users } from '../../types/Users';

type Props = {
  user: Users;
};

const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div>
      <p>{`Name: ${user.name}`}</p>
      <p>{`Email: ${user.email}`}</p>
      <p>{`Phone: +${user.phone}`}</p>
    </div>
  );
};

export default UserInfo;
