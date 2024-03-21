import { User } from '../../types/User';

// Add the required types and props
type UserInfoProps = {
  user: User;
};

export const UserInfo: React.FC<UserInfoProps> = ({
  user: { email, name },
}) => (
  <a className="UserInfo" href={`mailto:${email}`}>
    {name}
  </a>
);
