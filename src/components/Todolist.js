import React from 'react';
import PropTypes from 'prop-types';
import './Todolist.css';

export const TodoList = ({ renderList }) => (
  <ul className="list">
    {renderList.map(task => (
      <li key={task.id} className="list__item">
        <div className="list__user">
          <strong>Username:</strong>
          {' '}
          {task.user}
        </div>
        <div className="list__title">
          <strong>Task:</strong>
          {' '}
          {task.title}
        </div>
        <div className="list__status">
          {task.completed ? 'Status: Finished' : 'Status: Unfinished'}
        </div>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  renderList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ),
};

TodoList.defaultProps = {
  renderList: [],
};
