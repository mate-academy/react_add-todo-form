import { User } from '../../types/type';

type Props = {
  users: User | null,
};

export const UserInfo:React.FC<Props> = ({ users }) => {
  return (
    <a
      className="UserInfo"
      href={`mailto:${users?.email}`}
    >
      {users?.name}
    </a>
  );
};
