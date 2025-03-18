import classNames from 'classnames';
import { ITodo } from '../../types/todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: ITodo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
