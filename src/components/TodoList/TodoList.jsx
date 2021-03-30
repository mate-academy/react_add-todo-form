import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

export const TodoList = React.memo(
  ({ list }) => (
    <ul className="list">
      {list.map(item => (
        <li
          className="list__item"
          key={item.id}
        >
          {item.user.name}
          <br />
          {item.title}
          {item.completed
            ? <span className="list__mark completed">✔</span>
            : <span className="list__mark uncompleted">✘</span>
            }
        </li>
      ))}
    </ul>
  ),
);

TodoList.propTypes = PropTypes.shape({
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,

  title: PropTypes.string.isRequired,
  completed: PropTypes.string.isRequired,
}).isRequired;
