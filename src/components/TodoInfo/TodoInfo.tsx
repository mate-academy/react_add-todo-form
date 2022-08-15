import classNames from 'classnames';

import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': todo.completed === true },
      )}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && (
        <UserInfo user={todo.user} />
      )}

    </article>
  );
};
