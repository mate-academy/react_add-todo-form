import { UserInfo } from '../UserInfo';
import { User, Todo } from '../Types/Types';

type TodoInfoProps = {
  todo: Todo;
  users?: User[];
};

export const TodoInfo = ({ todo, users }: TodoInfoProps) => {
  const user = users?.find(u => u.id === todo.userId) || todo.user;

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
