import classNames from 'classnames';
import { findUserById } from '../../services/findUserById';
import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      {todo.userId !== 0 && (<UserInfo user={findUserById(todo.userId)} />)}
    </article>
  );
};
