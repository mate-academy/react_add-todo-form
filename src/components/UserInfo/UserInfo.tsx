import { User } from '../../types/user';

export type Props = {
  user: User | undefined,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    user
      ? (
        <a className="UserInfo" href={`mailto:${user.email}`}>
          {user.name}
        </a>
      )
      : (
        <span>There is no user</span>
      )
  );
};
