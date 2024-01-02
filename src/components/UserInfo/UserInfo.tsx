export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface UserInfoProps {
  user: User | null | undefined;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  if (!user) {
    return <div>No user data available.</div>;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
