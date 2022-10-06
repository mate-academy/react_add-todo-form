import { User } from '../../types/User';

type Props = {
  todoUser: User | null | undefined,
};

export const UserInfo:React.FC<Props> = ({ todoUser }) => {
  return (
    <a className="UserInfo" href={todoUser ? (todoUser.email) : undefined}>
      {todoUser ? (todoUser.name) : undefined}
    </a>
  );
};
