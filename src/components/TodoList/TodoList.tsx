import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../react-app-env';

type Props = {
  todoWithUser: Todo[],
};

export const TodoList: React.FC<Props> = ({ todoWithUser }) => (
  <ul className="container">
    {todoWithUser.map(todo => (
      <li key={todo.id}>
        <div className="card">
          <UserInfo user={todo.user} />
          <TodoInfo todo={todo} />
        </div>
      </li>
    ))}
  </ul>
);
