import { User } from '../../types/User';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="UserInfo">
      {user && (
        <a className="UserInfo__email" href={`mailto:${user.email}`}>
          {user.name}
        </a>
      )}
    </div>
  );
};
