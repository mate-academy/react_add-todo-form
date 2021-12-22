import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <span>{user.name}</span>
    <span>{user.email}</span>
  </>
);
