import { User } from '../../App';

interface Props {
  userId: number;
  users: User[];
}
export const UserInfo: React.FC<Props> = ({ userId, users }) => {
  const user = users.find(u => u.id === userId);

  if (!user) {
    return <span>Unknown user</span>;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
