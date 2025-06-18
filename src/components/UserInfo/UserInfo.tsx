import users from '../../api/users';

export const UserInfo: React.FC = () => {
  const user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } = users[0];

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
