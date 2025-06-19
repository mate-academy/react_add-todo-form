import { User } from '../../App';

type PropsUser = {
  user: User;
};

export const UserInfo: React.FC<PropsUser> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
