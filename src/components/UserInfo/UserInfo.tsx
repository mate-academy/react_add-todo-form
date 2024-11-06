interface User {
  name: string;
  email: string;
}

export const UserInfo = ({ user }: { user: User }) => {
  const { name: userName, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {userName}
    </a>
  );
};
