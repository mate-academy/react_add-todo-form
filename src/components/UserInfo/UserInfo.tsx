type Props = {
  user: {
    name?: string,
    email?: string,
  } | null
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto: ${user && user.email}`}>
    {user && user.name}
  </a>
);
