interface UserInfoProps {
  userName: string;
  userEmail: string;
}

export const UserInfo: React.FC<UserInfoProps> = ({ userName, userEmail }) => (
  <a className="UserInfo" href={`mailto:${userEmail}`}>
    {userName}
  </a>
);
