import { User } from '../../types/user';

type Props = {
  user: User;
};

export const UserInfo = ({ user }: Props): JSX.Element => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
