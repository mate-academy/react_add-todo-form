import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

function TodoList({ todos }) {
  return (
    <div className="todos-list">
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    })
  ).isRequired,
};

export default TodoList;
