import React from 'react';
import { Todo } from '../Types/Todo';
import { UserInfo } from '../UserInfo';

export const TodoInfo = ({ todo }: { todo: Todo }) => (
  <article
    data-id={todo.id}
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user ? <UserInfo user={todo.user} /> : <p>No user</p>}
  </article>
);
