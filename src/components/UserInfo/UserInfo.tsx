import { User } from '../../types/Users';

interface UserInfoProps {
  user: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({
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
