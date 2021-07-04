import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

export const TodoList = ({ todosData }) => (
  <ul className="TodoList">
    {todosData.map(item => (
      <li
        key={item.id}
        className="TodoList__item"
      >
        <p>
          {`User id: ${item.userId}`}
        </p>

        <p>
          {item.title}
        </p>

        <p>
          {item.completed ? 'done' : 'on progress'}
        </p>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todosData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
