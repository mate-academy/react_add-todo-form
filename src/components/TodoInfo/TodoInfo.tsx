import classNames from 'classnames';

import { UserInfo } from '../UserInfo';
import type { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => (
  <article
    data-id={todo.id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    <UserInfo user={todo.user} />
  </article>
);
