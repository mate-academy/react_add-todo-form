import React from 'react';
import { UserInfo } from '../UserList/UserInfo';
import { TodoInfo } from './TodoInfo';
import { PreparedTodos } from '../PreparedTodos';
import './TodoList.scss';

type Props = {
  todos: PreparedTodos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todoList">
    {todos.map(todo => (
      <li className="todoList__items" key={todo.id}>
        <TodoInfo todo={todo} />
        <UserInfo user={todo.user} />
      </li>
    ))}
  </ul>
);
