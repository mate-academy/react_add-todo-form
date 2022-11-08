type User = {
  id: number,
  name: string,
  username: string,
  email: string,
};

type Props = {
  user: User | undefined,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user !== undefined ? user.email : ''}`}>
      {user !== undefined ? user.name : ''}
    </a>
  );
};
