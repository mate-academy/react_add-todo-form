type Props = {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};

export const UserInfo = ({ user }: Props) => {
  return (
    <div className="UserInfo">
      <p>{user.name}</p>
      <a href={`mailto:${user.email}`}>{user.email}</a>
    </div>
  );
};
