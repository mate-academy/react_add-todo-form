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
    <div className="UserInfo">
      <p>{user.name}</p>
      <a href={`mailto:${user.email}`}>{user.email}</a>
    </div>
  );
};
