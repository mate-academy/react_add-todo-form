import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import User from './User';

const TodoList = ({ currentTodos }) => (
  <div>
    {currentTodos.map(todo => (
      <div key={todo.name}>
        <User user={todo} key={todo.id} />
      </div>
    ))}
  </div>
);

TodoList.propTypes = {
  currentTodos: PropTypes.arrayOf({
    todo: PropTypes.shape({
      userPrepare: PropTypes.object.isRequired,
    }).isRequired,
    i: PropTypes.number.isRequired,
  }).isRequired,
};

export default TodoList;
