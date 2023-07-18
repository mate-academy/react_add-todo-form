import { User } from '../type.ts/User';

type Props = {
  user: User
};

export const UserInfo:React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
