import { TodoWithUser } from '../../types/todo';
import { UserInfo } from '../UserInfo';

type Prop = {
  todo: TodoWithUser;
};
export const TodoInfo = ({ todo }: Prop) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
