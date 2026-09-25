type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Props = {
  user: User;
};

export const UserInfo = ({ user }: Props) => {
  return (
    <div className="UserInfo">
      <a href={`mailto:${user.email}`}>{user.name}</a>
    </div>
  );
};
