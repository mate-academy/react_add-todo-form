import React from 'react';
import './ToDoItem.scss';
import PropTypes from 'prop-types';
import cn from 'classnames';
import User from '../User/User';

const ToDoItem = ({ todo }) => (
  <article className="todo-card">
    <h4>
      Card #&nbsp;
      {todo.id}
    </h4>
    <p>
      Current task:&nbsp;
      {todo.title}
    </p>
    <p className={cn({
      'todo-card__status': true,
      'todo-card__status--undone': !todo.completed,
    })}
    >
      {todo.completed
        ? 'Status: Completed'
        : 'Status: Not Completed'}
    </p>

    <User userInfo={todo.user} />
  </article>
);

ToDoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({}).isRequired,
  }).isRequired,
};

export default ToDoItem;
