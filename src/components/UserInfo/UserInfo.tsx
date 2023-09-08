import { UserData } from '../../types';

export const UserInfo:React.FC<{ user: UserData }> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>{user.name}</a>
);
