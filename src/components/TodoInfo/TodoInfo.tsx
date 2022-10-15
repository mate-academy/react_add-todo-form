import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

type TodoInfoProps = {
  todo: Todo
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const classNames = todo.completed
    ? 'TodoInfo TodoInfo--completed'
    : 'TodoInfo';

  return (
    <article data-id={todo.id} className={classNames}>
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
