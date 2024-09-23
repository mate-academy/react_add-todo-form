interface User {
  name: string;
  email: string;
  id: number;
  username: string;
}

export const UserInfo = ({ user }: { user: User }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
