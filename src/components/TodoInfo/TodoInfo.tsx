import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const isCompleted = classNames(
    'TodoInfo',
    { 'TodoInfo--completed': todo.completed === true },
  );

  return (
    <article data-id={todo.id} className={isCompleted}>
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
