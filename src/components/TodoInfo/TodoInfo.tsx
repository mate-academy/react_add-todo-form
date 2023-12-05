import classNames from 'classnames';
import { FC } from 'react';
import { TodoWithUser } from '../../Interfaces/Interfaces';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: TodoWithUser;
}

export const TodoInfo: FC<Props> = ({ todo }) => {
  const {
    completed,
    title,
    user,
  } = todo;

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
      key={todo.id}
    // className="TodoInfo TodoInfo--completed"
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
