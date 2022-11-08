import { User } from '../../types';

type Props = {
  user: User | undefined;
};

export const UserInfo = ({ user } : Props) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
