export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

type UserProps = {
  user: User;
};

export const UserInfo: React.FC<UserProps> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
