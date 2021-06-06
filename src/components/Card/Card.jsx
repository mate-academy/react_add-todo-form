import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { About } from '../About';
import { UserTodos } from '../UserTodos';

import './Card.scss';

export const Card = ({ user, userTodos }) => {
  const [count, setCount] = useState(0);

  const statusToggle = (event) => {
    const chosenTodo = userTodos.find(todo => todo.id === +event.target.value);
    const chosenTodoStatus = chosenTodo.completed;

    chosenTodo.completed = !chosenTodoStatus;

    setCount(count + 1);
  };

  return (

    <span
      key={user.id}
      className={classNames(
        'card',
        { 'card--is-completed': userTodos.every(todo => todo.completed) },
      )}
    >
      <About {...user} />
      <UserTodos
        userTodos={userTodos}
        statusToggle={statusToggle}
      />
    </span>
  );
};

Card.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  userTodos: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
