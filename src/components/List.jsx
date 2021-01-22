import React from 'react';
import PropTypes from 'prop-types';
import './List.css';

export const List = ({ renderList }) => (
  <ul className="list">
    {renderList.map(task => (
      <li key={task.id} className="list__item">
        <div className="list__user">
          <strong>Username:</strong>
          {' '}
          {task.user}
        </div>
        <div className="list__title">
          <strong>task:</strong>
          {' '}
          {task.title}
        </div>
        <div className="list__status">
          {task.completed ? 'Status: DONE' : 'Status: Unfinished'}
        </div>
      </li>
    ))}
  </ul>
);

List.propTypes = {
  renderList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ),
};

List.defaultProps = {
  renderList: [],
};
