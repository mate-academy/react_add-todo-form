import { User } from '../../types/User';

interface Props {
  todoUser: User;
}

export const UserInfo: React.FC<Props> = ({ todoUser }) => {
  return (
    <a className="UserInfo" href={`mailto:${todoUser.email}`}>
      {todoUser.name}
    </a>
  );
};
