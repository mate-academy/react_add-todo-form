import classNames from 'classnames';

import { TodoWithUser } from '../../types';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoWithUser;
};

export const TodoInfo = ({ todo }: Props) => {
  return (
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
};
