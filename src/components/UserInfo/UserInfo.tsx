type Props = {
  userName: string;
  userEmail: string;
};

export const UserInfo: React.FC<Props> = ({ userName, userEmail }) => {
  return (
    <a className="UserInfo" href={`mailto:${userEmail}`}>
      {userName}
    </a>
  );
};
