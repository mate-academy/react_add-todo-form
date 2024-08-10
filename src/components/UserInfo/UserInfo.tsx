interface UserData {
  userEmail: string;
  userName: string;
}

type Props = {
  userData: UserData;
};

export const UserInfo: React.FC<Props> = ({ userData }) => {
  const { userEmail, userName } = userData;

  return (
    <a className="UserInfo" href={`mailto:${userEmail}`}>
      {userName}
    </a>
  );
};
