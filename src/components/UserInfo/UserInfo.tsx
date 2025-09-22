type User = {
  id: string;
  name: string;
  email: string;
};

interface UserInfoProps {
  user: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user ? user.email : '#'}`}>
    {user && user.name}
  </a>
);
