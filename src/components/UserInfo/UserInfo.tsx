interface User {
  id: number;
  name: string;
  email: string;
}

interface UserInfoProps {
  userId: number;
  user: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
