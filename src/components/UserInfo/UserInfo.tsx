interface User {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
}
export const UserInfo: React.FC<User> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
