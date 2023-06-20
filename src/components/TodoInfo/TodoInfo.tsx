import { FC } from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type PropsTodo = {
  todo: Todo;
};

export const TodoInfo: FC<PropsTodo> = ({ todo }) => {
  const {
    title,
    id,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={
        completed
          ? 'TodoInfo TodoInfo--completed'
          : 'TodoInfo'
      }
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
