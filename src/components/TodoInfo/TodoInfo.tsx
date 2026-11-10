import React from 'react';
import todosFromServer from '../../api/todos';
import usersFromServer from '../../api/users'
import { UserInfo } from '../UserInfo';

type Todo = (typeof todosFromServer)[number] & {
  user?: (typeof usersFromServer)[number];
};

type Props = {
  todo: Todo;
};


export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? `TodoInfo--completed` : ``}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo
        user={todo.user} />}
    </article>
  );
};
