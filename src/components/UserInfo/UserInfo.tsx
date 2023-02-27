type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const UserInfo = ({ user }: { user: User }) => {
  const { email, name } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
