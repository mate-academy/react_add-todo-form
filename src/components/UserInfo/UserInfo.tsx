import usersFromServer from '../../api/users';

type Props = {
  userId: number
};

export const UserInfo: React.FC<Props> = ({ userId }) => {
  const user = usersFromServer.find(person => person.id === userId)
  || null;

  if (user) {
    const { name, email } = user;

    return (
      <a className="UserInfo" href={`mailto:${email}`}>
        {name}
      </a>
    );
  }

  return null;
};
