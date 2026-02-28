import { Todo } from '../../App';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
