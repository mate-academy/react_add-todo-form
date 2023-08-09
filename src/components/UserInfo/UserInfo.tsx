type Props = {
  user: {
    id: number;
    name: string;
    username: string;
    email: string;
  } | null;
};
export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return null;
  }

  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
