import { FC } from 'react';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { PreparedTodo } from '../../types/PreparedTodo';

type Props = {
  todo: PreparedTodo;
};

export const TodoInfo: FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={
        classNames('TodoInfo', {
          'TodoInfo--completed': completed,
        })
      }
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user
        ? <UserInfo user={user} />
        : <span>Unknown user</span>}
    </article>
  );
};
