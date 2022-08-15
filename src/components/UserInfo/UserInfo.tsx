type Props = {
  user: User;
};

type User = {
  name: string;
  email: string;
};

export const UserInfo = (props: Props) => {
  const { user } = props;

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
