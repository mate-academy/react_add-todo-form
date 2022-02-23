import React from 'react';
import './TodoList.scss';
import { TodoInfo } from '../TodoInfo/TodoInfo';

export const TodoList: React.FC<PreparedTodo> = ({ todos }) => {
  return (
    <ul className="todoList">
      {todos.map((todo => (
        <TodoInfo todo={todo} />
      )))}
    </ul>
  );
};
