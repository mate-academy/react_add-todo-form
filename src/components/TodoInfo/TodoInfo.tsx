import classNames from 'classnames';
import { TodoType } from '../../types/TodoType';
import { UserInfo } from '../UserInfo';

type TodoInfoType = {
  todo: TodoType;
};

export const TodoInfo: React.FC<TodoInfoType> = ({ todo }) => {
  const todoInfoClasses = classNames('TodoInfo', {
    'TodoInfo--completed': todo.completed,
  });

  return (
    <article className={todoInfoClasses}>
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
