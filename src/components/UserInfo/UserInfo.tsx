import { Users, Todo } from '../TodoList';

type Props = {
  usersFromServer: Users[],
  todo: Todo,
};

export const UserInfo: React.FC<Props> = ({
  usersFromServer,
  todo,
}) => {
  const filteredUser = usersFromServer.find(
    (user) => user.id === todo.userId,
  );

  return (
    <>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <a className="UserInfo" href={`mailto:${filteredUser?.email}`}>
        {filteredUser?.name}
      </a>
    </>
  );
};
