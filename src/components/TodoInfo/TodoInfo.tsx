import { Todo } from '../../Types/Todo';
import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={
        todo.completed === true ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'
      }
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
