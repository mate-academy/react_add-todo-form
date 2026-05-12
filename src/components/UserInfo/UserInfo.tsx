export const UserInfo = ({ user }) => {
  if (!user) {
    return null;
  }

  const { email, name } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
