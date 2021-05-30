import React from 'react';
import './todosList.css';

import PropTypes from 'prop-types';

export const TodosList = React.memo(({ todos }) => (
  <ul className="App__list">
    {todos.map(todo => (
      <li key={todo.id} className="App__item">
        <h3>{todo.user}</h3>

        <span>
          {`Task: `}
          <strong className="App__card-title">{todo.title}</strong>
        </span>

        <p>
          {`Status: `}
          {todo.completed
            ? <strong className="App__card-completed">Completed</strong>
            : (
              <strong className="App__card-notCompleted">
                Not completed
              </strong>
            )
            }
        </p>
      </li>
    ))}
  </ul>
));

TodosList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};
