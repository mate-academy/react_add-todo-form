export type UserInfoProps = {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name || 'Unknown User'}
    </a>
  );
};
