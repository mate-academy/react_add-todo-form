import { Todos } from '../../types/Todos';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: Todos;
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
