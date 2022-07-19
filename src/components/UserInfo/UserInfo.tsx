import usersFromServer from '../../api/users';

type Props = { user?: User };

function findUserName(id?: number) {
  const todoUser = usersFromServer.find(user => user.id === id);

  return todoUser?.name;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {findUserName(user?.id)}
    </a>
  );
};
