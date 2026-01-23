import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type TodoInfoProps = {
  todo: Todo;
  user: User | undefined;
};

export const TodoInfo = ({ todo, user }: TodoInfoProps) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {user && (
        <a className="UserInfo" href={`mailto:${user.email}`}>
          {user.name}
        </a>
      )}
    </article>
  );
};
