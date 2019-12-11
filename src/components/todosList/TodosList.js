import React from 'react';
import PropTypes from 'prop-types';
import './todoList.css';

const TodosList = ({ list }) => (
  <ul className="list-style">
    {list.map(todo => (
      <li
        key={todo.title}
        className="item-style"
      >
        {todo.title}
        <span className="info">
          <span className="user-id">
            <span className="user-info">user id:</span>
          &nbsp;
            {todo.userId}
          </span>
          <span className="user-info">user name:</span>
          &nbsp;
          {todo.userName}
        </span>
      </li>
    ))}
  </ul>
);

TodosList.propTypes
  = {
    list: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool]))),
  };

TodosList.defaultProps
= {
    list: [],
  };
export default TodosList;
