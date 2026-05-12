export const UserInfo = ({ user }) => {
  const { email, name } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
