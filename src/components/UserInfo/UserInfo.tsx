import { User } from '../../types/User';

type Prop = {
  user: User | null;
};

export const UserInfo = ({ user }: Prop) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
