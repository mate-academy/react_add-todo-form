import { User } from '../../api/types/User';

type Props = {
  user?: User;
};
export const UserInfo = ({ user }: Props) => {
  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
