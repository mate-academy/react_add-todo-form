import { User } from '../../types/User';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  user && (
    <a className="userInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  )
);
