interface User {
  user?: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
}

export const UserInfo = ({ user }: User) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
