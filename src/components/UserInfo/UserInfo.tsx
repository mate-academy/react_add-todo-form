export interface User {
  id: number,
  name: string,
  username: string,
  email: string,
}

interface Props {
  user: User,
}

export const UserInfo = ({ user }: Props) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
