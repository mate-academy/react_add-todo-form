import { User } from '../../Types/User';
import './UserInfo.scss';

type Props = {
  user: User;
};

export const UserInfo = ({ user: { email, name } }: Props) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
