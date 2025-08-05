import { Todo } from '../../App';
import { UserInfo } from '../UserInfo/UserInfo';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  const todoClass = todo.completed ? 'TodoInfo--completed' : '';

  return (
    <article data-id={todo.id} className={`TodoInfo ${todoClass}`}>
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
