import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = (props) => {
  const { todos } = props;

  return (
    <ul className="todos">
      {
        todos.map(currentTodo => (
          <li className="todos__item" key={currentTodo.id}>
            <span>{currentTodo.id}</span>
            <span>{currentTodo.title}</span>
            <span>{currentTodo.user.name}</span>
          </li>
        ))
      }
    </ul>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.any,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
};
