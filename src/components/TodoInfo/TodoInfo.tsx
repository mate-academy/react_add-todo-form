import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/todo';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => (
  <article
    data-id={todo.id}
    className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
