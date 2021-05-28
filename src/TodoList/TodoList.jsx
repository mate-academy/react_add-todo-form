import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoList = ({ todos }) => (
  <ul>
    {todos.map(el => (
      <li key={el.id} className="todo">
        <div className="title">
          {el.title}
          <div>
            {el.user.name}
          </div>
        </div>
        <div className="complete-status">
          {el.completed ? (
            <div
              className={classNames('complete-status', 'active')}
            >
              Finished
            </div>
          ) : ('Uncomplete')}
        </div>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf({
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
