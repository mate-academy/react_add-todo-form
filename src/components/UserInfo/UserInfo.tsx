export interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
}

type Props = {
  user: Users,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
