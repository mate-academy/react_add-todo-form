import { User } from '../../type';

export const UserInfo: React.FC<User> = ({ name, email }) => {
  return (
    <a className="UserInfo" href={email}>
      {name}
    </a>
  );
};
