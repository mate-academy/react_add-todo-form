import classNames from 'classnames';
import { Todo, User } from '../../types';
import { UserInfo } from '../UserInfo';

type TodoWithUser = Todo & {
  user: User | undefined
};

type Props = {
  todo: TodoWithUser
};

export const TodoInfo = ({ todo }: Props) => {
  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo', { 'TodoInfo--completed': todo.completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
