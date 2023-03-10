interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Props {
  user: User,
  userName: string,
  userEmail: string,
}

export const UserInfo: React.FC<Props> = ({ userName, userEmail }) => (
  <a className="UserInfo" href={`mailto:${userEmail}`}>
    {userName}
  </a>
);
