import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  someToDo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ someToDo }) => {
  const { title, completed, user } = someToDo;

  return (
    <article
      data-id={someToDo.id}
      className={completed
        ? 'TodoInfo TodoInfo--completed'
        : 'TodoInfo'}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && (
        <UserInfo human={user} />
      )}

    </article>
  );
};
