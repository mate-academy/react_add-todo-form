import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';
import { TodoCard } from '../TodoCard/TodoCard';

export const TodoList = ({ todos, setStatus }) => (
  <div className="todos__list">
    <ul>
      {todos.map(todo => (
        <TodoCard
          todo={todo}
          key={todo.id}
          setStatus={setStatus}
        />
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  setStatus: PropTypes.func.isRequired,
};
