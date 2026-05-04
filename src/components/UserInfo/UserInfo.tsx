import { User } from '../../types/user';

type Prop = {
  user: User | undefined;
};

export const UserInfo = ({ user }: Prop) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
