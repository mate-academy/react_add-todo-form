import { User } from '../../types/User';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user: { email, name } }) => {
  return (
    <a href={`mailto:${email}`} className="UserInfo">
      {name}
    </a>
  );
};
