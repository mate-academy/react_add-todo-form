import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const isCompleted = todo.completed
    ? 'TodoInfo TodoInfo--completed'
    : 'TodoInfo';

  return (
    <>
      <article data-id={todo.id} className={isCompleted}>
        <h2 className="TodoInfo__title">{todo.title}</h2>

        {todo.user && <UserInfo user={todo.user} />}
      </article>
    </>
  );
};
