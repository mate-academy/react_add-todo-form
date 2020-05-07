import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './TodoItem.css';

export const TodoItem = ({ title, completed, user, id }) => (
  <li className="todos__item" key={id}>
    <span className={classNames('todos__item-status',
      {
        'todos__item-status--true': completed,
        'todos__item-status--false': !completed,
      })}
    />
    <div className="todos__item-desc">
      <p className="todos__item-text">{title}</p>
      <span className="todos__item-autor">{user.name}</span>
    </div>
  </li>
);

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  id: PropTypes.number.isRequired,
};
