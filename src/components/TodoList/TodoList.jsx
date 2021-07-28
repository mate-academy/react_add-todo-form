import React from 'react';

import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = React.memo(({ listTodos, currentUser }) => {
  const listForRender = listTodos.filter(
    todo => todo.userId === Number(currentUser),
  );

  return (
    <ul className="todo__list">
      {listForRender.map((todo) => {
        const { id, title, completed } = todo;

        return (
          <li key={id} className="todo__item">
            <p className="todo__text">{title}</p>
            {
              completed
                ? (<span className="todo__completed">Completed</span>)
                : (<span className="todo__no-complete">Not done</span>)
            }
          </li>
        );
      })}
    </ul>
  );
});

TodoList.propTypes = {
  listTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      completed: PropTypes.bool.isRequired,
    }),
  ),
  currentUser: PropTypes.string,
};

TodoList.defaultProps = {
  listTodos: PropTypes.arrayOf(
    PropTypes.shape({
      title: '',
    }),
  ),
  currentUser: '',
};
