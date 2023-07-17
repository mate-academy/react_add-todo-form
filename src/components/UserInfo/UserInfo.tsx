import { User } from '../../types/types';

type Prop = {
  user: User;
};

export const UserInfo:React.FC<Prop> = ({ user }) => {
  return (
    <a
      className="UserInfo"
      href={`mailto:${user?.email}`}
    >
      {user?.name}
    </a>
  );
};
