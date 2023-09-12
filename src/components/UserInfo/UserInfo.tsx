import { User } from '../../types/User';

type Props = {
  user: User | null
};

export const UserInfo = ({ user }: Props) => (
  user
    ? (
      <a className="UserInfo" href={`mailto:${user?.email}`}>
        {user.name}
      </a>
    )
    : 'User is not found'
);
