export type User = {
  id: number
  name: string
  username: string
  email: string
};

export type UserProps = {
  user: User
};

export const UserInfo = ({ user }: UserProps) => {
  const { email, name } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
