import { User } from '../../types';

interface UserInfoProps {
  user: User,
}

export const UserInfo: React.FC<UserInfoProps> = ({
  user: {
    email, name,
  },
}) => (
  <a className="UserInfo" href={`mailto:${email}`}>
    {name}
  </a>
);
