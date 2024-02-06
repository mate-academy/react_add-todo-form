export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="User-Info" href={`email: ${email}`}>
      {name}
    </a>
  );
};
