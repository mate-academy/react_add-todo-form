import usersFromServer from '../../api/users';

type Props = {
  id: number,
};

type User = {
  id: number,
  name: string,
  username: string,
  email: string,
};

export const UserInfo: React.FC<Props> = ({ id }) => {
  const user: User[] = usersFromServer.filter(person => person.id === id);
  const { name, email } = user[0];

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
