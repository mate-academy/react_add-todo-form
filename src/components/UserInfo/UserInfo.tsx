import '../../App.scss';
import { User } from '../../services/user';

type Props = {
  user: User;
};

export const UserInfo = ({ user }: Props) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
