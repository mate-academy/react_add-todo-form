export const UserInfo: React.FC<UserInfoType> = ({ name, email }) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
