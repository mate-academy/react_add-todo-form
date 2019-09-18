import React from 'react';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';
import { TodoListPropTypes } from '../../constants/proptypes';

function TodoList({ todos }) {
  return (
    <ul className="todo-list">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
}

TodoList.propTypes = TodoListPropTypes;

export default TodoList;
