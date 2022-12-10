import usersFromServer from '../../api/users';

type Props = {
  userId: number
};

export const UserInfo: React.FC<Props> = ({ userId }) => {
  const user = usersFromServer.find(person => person.id === userId);

  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
