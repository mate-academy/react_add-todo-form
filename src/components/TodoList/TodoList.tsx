import React from 'react';
import { FullTodo } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoList.scss';

type Props = {
  fulltodos: FullTodo[];
};

export const TodoList: React.FC<Props> = ({ fulltodos }) => (
  <ul className="Todolist">
    {fulltodos.map(todo => (
      <li key={todo.id} className="card">
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
