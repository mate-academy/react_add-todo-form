import React, { useContext } from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodoWithUser } from '../../react-app-env';
import { TodosContext } from '../TodosProvider';

type Props = {
  todo: TodoWithUser
};

export const TodoInfo: React.FC<Props> = React.memo(({ todo }) => {
  const {
    id, title, user, completed,
  } = todo;

  const { deleteTodo } = useContext(TodosContext);

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      { user && <UserInfo user={user} /> }

      <button
        type="button"
        onClick={() => deleteTodo(id)}
      >
        x
      </button>
    </article>
  );
});
