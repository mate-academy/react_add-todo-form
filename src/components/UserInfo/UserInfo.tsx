import { User } from '../../types/User';

type UserInf = {
  user: User,
};

export const UserInfo: React.FC<UserInf> = ({
  user: {
    email,
    name,
  },
}) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
