import React from 'react';
import User from '../User/User';
import classNames from 'classnames';

const TodoItem = ({ todo }) => {
  const { completed, title, id, user } = todo;
  const listItemClass = classNames(
    'todo-list__item',
    {
      'todo-list__item--is-completed': completed,
    }
  );

  return (
    <div className="col-md-6 col-lg-4 mb-5">
      <div className={listItemClass}>
        <h2>{title}</h2>
        <User user={user} />
        <p>ID: {id}</p>
      </div>
    </div>
  );
};

export default TodoItem;
