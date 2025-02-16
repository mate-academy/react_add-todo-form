import React from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

const findUser = (userId: number) => usersFromServer.find(u => u.id === userId);

interface Props {
  todo: Todo;
}

export const TodoInfo = ({ todo }: Props) => (
  <article
    key={todo.id}
    data-id={todo.id}
    className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    <UserInfo user={findUser(todo.userId)} />
  </article>
);
