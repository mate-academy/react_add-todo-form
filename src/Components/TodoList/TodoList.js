import React from 'react';
import { TodoListProps } from '../PropTypes/PropTypes';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

const TodoList = ({ todos }) => (
  <div className="todos-list">
    {todos.map(todo => (
      <TodoItem todo={todo} key={todo.id} />
    ))}
  </div>
);

TodoList.propTypes = TodoListProps;

export default TodoList;
