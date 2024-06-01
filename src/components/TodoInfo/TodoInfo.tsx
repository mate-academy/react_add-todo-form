import { FC } from 'react';
import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../../models/Todo';
import classNames from 'classnames';

interface Props {
  todo: TodoWithUser;
}

export const TodoInfo: FC<Props> = ({ todo }) => {
  return (
    <article
      data-id="1"
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
