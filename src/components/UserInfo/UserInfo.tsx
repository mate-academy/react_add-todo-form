import { User } from '../../types/User';

type UserInformation = {
  user: User,
};

export const UserInfo: React.FC<UserInformation> = ({
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
