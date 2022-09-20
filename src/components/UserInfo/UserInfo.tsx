import { User } from '../../type';

export const UserInfo: React.FC<User> = ({ name, email }) => (
  <a className="UserInfo" href={email}>
    {name}
  </a>
);
