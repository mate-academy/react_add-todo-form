import './UserInfo.scss';
import { useUsers } from '../UsersProvider/context/UsersContext';

type Props = {
  userId: number;
};

export const UserInfo: React.FC<Props> = ({ userId }) => {
  const { getUserById } = useUsers();

  const user = getUserById(userId);

  return (
    <>
      {user && (
        <a
          className="UserInfo"
          href={`mailto:${user.email}`}
        >
          {user.name}
        </a>
      )}
    </>
  );
};
