import { UnifiedTodo } from '../../types/Types';
import { UserInfo } from '../UserInfo';
import classnames from 'classnames';

type TodoInfoProps = {
  todo: UnifiedTodo;
};

export const TodoInfo = ({ todo }: TodoInfoProps) => {
  return (
    <article
      data-id={todo.id}
      className={classnames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
