type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

interface UserInfoProps {
  user: User;
}

export const UserInfo = ({ user }: UserInfoProps) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`} data-cy="userInfo">
      {user.name}
    </a>
  );
};
