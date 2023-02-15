import React, { useContext } from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosProvider';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = React.memo(({ todo }) => {
  const {
    id, completed, title, user,
  } = todo;

  const { deleteTodo } = useContext(TodosContext);

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <button type="button" onClick={() => deleteTodo(id)}>
        x
      </button>

      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
});
