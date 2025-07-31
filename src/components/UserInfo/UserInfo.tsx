import { User } from '../../types/User';

export const UserInfo: React.FC<User> = ({ id, name, email }) => {
  if (!name || !email) {
    return null;
  }

  return (
    <a key={id} className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
