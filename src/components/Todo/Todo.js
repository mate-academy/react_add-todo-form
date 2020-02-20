import React from 'react';
import PropTypes from 'prop-types';

import './Todo.css';

const Todo = ({ todos }) => (
  <>
    {todos.map(todo => (
      <tr className="table__row" key={todo.id}>
        <td className="table__column-body">{todo.id}</td>
        <td className="table__column-body">{todo.title}</td>
        <td className="table__column-body">{todo.userId}</td>
      </tr>
    ))}
  </>
);

Todo.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    userId: PropTypes.number,
  })).isRequired,
};

export default Todo;
