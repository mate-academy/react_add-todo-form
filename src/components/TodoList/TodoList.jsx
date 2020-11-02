import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({ tasks }) => (
  <div className="todo-container">
    {tasks.map(item => (
      <div key={item.id} className="todo-container__todo">
        {item.user.name}
        {':  '}
        {item.title}
      </div>
    ))}
  </div>
);

TodoList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
};
