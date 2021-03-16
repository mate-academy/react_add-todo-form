import React from 'react';
import PropTypes from 'prop-types';

export const TodoList = ({ todoList }) => (
  <>
    <ul className="todoList">
      {todoList.map(el => (
        <li key={el.id}>
          <h3>{el.name}</h3>
          <p>{el.title}</p>
          <p>{el.id}</p>
        </li>
      ))}
    </ul>
  </>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
