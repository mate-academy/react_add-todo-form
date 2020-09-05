import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';
import { Todo } from '../Todo/Todo';

export const TodoList = ({ todos }) => (
  <section className="list">
    <div className="list__item list__item--header">
      <span>Name</span>
      <p>Task</p>
      <span>Status</span>
    </div>
    {todos.map(todo => (
      <article className="list__item" key={todo.id}>
        <Todo {...todo} />
      </article>
    ))}
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
