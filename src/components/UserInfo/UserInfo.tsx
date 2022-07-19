import { User } from '../../react-app-env';

export const UserInfo: React.FC<User> = ({ user }) => (
  <strong>{user}</strong>
);
