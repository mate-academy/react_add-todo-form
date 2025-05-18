import { UserInfo } from '../UserInfo';
import usersFromServer from '../../api/users';

type InfoProps = {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
  };
};

export const TodoInfo = ({ todo }: InfoProps) => {
  const user = usersFromServer.find(userf => userf.id === todo.userId);

  if (!user) {
    throw new Error(`User with ID ${todo.userId} not found`);
  }

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
