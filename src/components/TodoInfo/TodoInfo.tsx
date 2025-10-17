import classNames from 'classnames';
import { TodoAggregate } from '../domain/TodoAggregate';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: TodoAggregate;
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
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
