/* eslint-disable import/no-cycle */
import React from 'react';
import './TodoList.css';

import { PreparedTodo } from '../../App';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todos: PreparedTodo[];
};

export const TodoList:React.FC<Props> = ({ todos }) => (
  <ul className="todo__list">
    {todos.map((todo) => (
      <li className="todo__item" key={todo.id}>
        {todo.user && (
          <UserInfo user={todo.user} />
        )}
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
