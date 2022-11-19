type User = {
  id: number,
  name: string,
  username: string,
  email: string,
};

type Props = {
  user?: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a
      className="UserInfo"
      data-user-info="UserInfo"
      href={`mailto:${user && user.email}`}
    >
      {user && user.name}
    </a>
  );
};
