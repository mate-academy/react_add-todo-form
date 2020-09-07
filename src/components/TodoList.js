import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

function TodoList({ todos }) {
  return (
    <ul className="list">
      {todos.map(todo => (
        <li key={todo.id} className="list-item">
          <Todo {...todo} />
        </li>
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
