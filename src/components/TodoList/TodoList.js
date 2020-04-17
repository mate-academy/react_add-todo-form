import React from 'react';
import './TodoList.css';
import { allTodos } from '../../types/types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ preparedTodos }) => (
  <div className="todos-list">
    {preparedTodos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
  </div>
);

TodoList.propTypes = {
  preparedTodos: allTodos.isRequired,
};
