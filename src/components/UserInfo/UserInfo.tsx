import './UserInfo.scss';
import { User } from '../../types/User';

type Props = {
  user: User
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const {
    id,
    name,
    email,
  } = user;

  return (
    <a
      className="UserInfo"
      data-id={id}
      href={`mailto:${email}`}
    >
      {name}
    </a>
  );
};
