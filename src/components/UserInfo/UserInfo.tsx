type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Props = {
  user?: User | null;
};

export const UserInfo = ({ user }: Props) => {
  if (!user) {
    return null;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
