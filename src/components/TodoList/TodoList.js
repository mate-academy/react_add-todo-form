import React from 'react';
// import { TodoListProps } from '../constants/PropTypes';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <TodoItem todo={todo} key={todo.id} />
    ))}
  </ul>
);

// TodoList.propTypes = TodoListProps;

export default TodoList;
