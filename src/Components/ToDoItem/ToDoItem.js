/* eslint-disable max-len */
import React from 'react';
import './ToDoItem.scss';
import PropTypes from 'prop-types';
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
    {todo.completed
      ? <p className="todo-card__status todo-card__status--done">Status: Completed</p>
      : <p className="todo-card__status todo-card__status--undone">Status: Not Completed</p>}

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
