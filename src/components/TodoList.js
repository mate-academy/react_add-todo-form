import React from 'react';
import PropTypes, { object } from 'prop-types';

const TodoList = ({ todos, toggleComplete }) => (

  <ul className="todo__list">
    {todos.map(todo => (
      <li
        className={
          !todo.completed
            ? 'todo__item'
            : 'todo__item todo__item--done'
        }
        key={todo.id}
      >
        <h2 className="todo__title">
          {todo.id}
          {'. '}
          {todo.title}
        </h2>
        <p className="todo_personName">
          <span className="todo_personId">
            Person#
            {' '}
            {todo.person.id}
          </span>
          {todo.person.name}
        </p>
        <label>
          <input
            className="todo__checkbox"
            type="checkbox"
            checked={todo.complete}
            onChange={() => toggleComplete(todo.id)}
          />
          {todo.completed ? 'Done' : 'In Process'}
        </label>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(object).isRequired,
  toggleComplete: PropTypes.func.isRequired,
};

export default TodoList;
