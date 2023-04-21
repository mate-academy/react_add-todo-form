interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const UserInfo = (props: { user: User }) => {
  const { user } = props;

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
