import usersFromServer from '../../api/users';

type Props = {
  idOnUser: number;
};

export const UserInfo: React.FC<Props> = ({ idOnUser }) => {
  return usersFromServer
    .filter(user => user.id === idOnUser)
    .map(user => (
      <a key={user.id} className="UserInfo" href={`mailto:${user.email}`}>
        {user.name}
      </a>
    ));
};
