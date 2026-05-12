type Props = {
  user: {
    name: string;
    email: string;
    id: string;
    username: string;
  };
};

export const UserInfo = ({ user }: Props) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {user.name}
  </a>
);
