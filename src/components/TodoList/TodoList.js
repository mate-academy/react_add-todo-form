import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

const TodoList = ({ listOfTodos }) => (
  <div className="todo-list">
    {listOfTodos.map(todo => (
      <div
        className="todo"
        key={todo.id}
      >
        <h5>{todo.title}</h5>
        <p>{'\u2718'}</p>
        <p>{`User id: ${todo.userId}`}</p>
      </div>
    ))}
  </div>
);

TodoList.propTypes = {
  listOfTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }).isRequired,
  ).isRequired,
};

export default TodoList;
