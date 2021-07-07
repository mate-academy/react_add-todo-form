import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo/Todo';
import './TodoList.css';

const TodoList = ({ list }) => (
  <ul className="todo__list">
    {list.map(element => (
      <li
        key={element.id}
        className={element.completed
          ? 'todo__list-item completed'
          : 'todo__list-item'}
      >
        <Todo
          title={element.title}
          user={element.user}
        />
      </li>
    ))}
  </ul>
);

export default TodoList;

TodoList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};
