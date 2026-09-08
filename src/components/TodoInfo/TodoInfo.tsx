import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoMerged } from '../../types/TodoMerged';

export const TodoInfo = ({ todo }: { todo: TodoMerged }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo',
        todo.completed && 'TodoInfo--completed',
      )}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
