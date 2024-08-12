type UserInfoProps = {
  email: string;
  name: string;
};

export const UserInfo: React.FC<UserInfoProps> = ({ email, name }) => {
  return (
    <a className="UserInfo" href={email}>
      {name}
    </a>
  );
};
