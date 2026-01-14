import { User } from '../../types/user';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) =>
  user.email ? (
    <a href={`mailto:${user.email}`}>{user.name}</a>
  ) : (
    <span>Unknown</span>
  );
