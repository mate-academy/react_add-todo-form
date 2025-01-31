interface User {
  id: number;
  name: string;
  email: string;
}

interface UserInfoProps {
  user: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      <a>{user.name}</a>
    </a>
  );
};
