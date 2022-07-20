import { User } from '../../type';

export const UserInfo: React.FC<User> = ({ user }) => (
  <strong>{user}</strong>
);
