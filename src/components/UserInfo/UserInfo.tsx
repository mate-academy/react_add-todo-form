type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
type UserInfoProps = {
  user: User;
};
export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
