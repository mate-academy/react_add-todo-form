import React from 'react';
import { FullTodo } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  fulltodos: FullTodo[];
};
export const Todolist: React.FC<Props> = ({ fulltodos }) => (
  <ul className="Todolist">
    {fulltodos.map(todo => (
      <li key={todo.id} className="item">
        {todo.user
          && (
            <UserInfo
              user={todo.user}
            />
          )}
        <TodoInfo
          todo={todo}
        />
      </li>
    ))}
  </ul>
);
