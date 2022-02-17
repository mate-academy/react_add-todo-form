import { User } from '../../types/User';

import './UserInfo.scss';

type Props = {
  user: User;
};

const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <h4>{`User name: ${user.name}`}</h4>
    <h4 className="email">{`User email: ${user.email}`}</h4>
  </>
);

export default UserInfo;
