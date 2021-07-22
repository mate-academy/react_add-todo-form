import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { About } from '../About';
import { UserTodos } from '../UserTodos';

import './Card.scss';

function countTodosCompleted(todos) {
  return todos.filter(todo => todo.completed).length;
}

export const Card = ({ user, userTodos }) => {
  const [count, setCount] = useState(countTodosCompleted(userTodos));

  useEffect(() => {
    setCount(countTodosCompleted(userTodos));
  });

  const statusToggle = (event) => {
    const { value } = event.target;
    const chosenTodo = userTodos.find(todo => todo.id === value);

    chosenTodo.completed = !chosenTodo.completed;

    setCount(countTodosCompleted(userTodos));
  };

  return (
    <span
      key={user.id}
      className={classNames(
        'box',
        { 'box--is-completed': count === userTodos.length },
      )}
    >
      <About {...user} />

      <UserTodos
        userTodos={userTodos}
        statusToggle={statusToggle}
      />
      <progress
        className="progress is-success"
        value={count}
        max={userTodos.length}
      />
    </span>
  );
};

Card.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.object.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  userTodos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
