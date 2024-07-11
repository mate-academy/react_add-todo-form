import { User } from '../../types/Todo';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a key={user.id} className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
