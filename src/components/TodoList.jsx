import React from 'react';
import PropTypes from 'prop-types';

import Todo from './Todo';

function TodoList({ todos }) {
  return (
    <>
      <ul className="todos__list">
        {todos.map(todo => (
          <li className="todos__item" key={todo.id}>
            <Todo
              title={todo.title}
              completed={todo.completed}
              user={todo.user}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default TodoList;

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
      user: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
        }),
      ).isRequired,
    }),
  ).isRequired,
};
