type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type UserProps = {
  user: User;
};

export const UserInfo = ({ user }: UserProps) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
