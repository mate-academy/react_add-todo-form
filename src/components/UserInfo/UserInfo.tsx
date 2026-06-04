type Props = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const UserInfo = ({ user }: { user: Props }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
