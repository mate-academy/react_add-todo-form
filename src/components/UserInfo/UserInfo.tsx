import { User } from '../../App';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user && user.email}`}>
      {user && user.name}
    </a>
  );
};
