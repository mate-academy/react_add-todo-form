import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

const TodoItem = ({ todo }) => (
  <div>
    <input type="checkbox" checked={todo.completed} />
    <p>{todo.title}</p>
  </div>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    completed: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

export default TodoItem;
