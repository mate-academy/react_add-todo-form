import React from 'react';
import PropTypes, { object } from 'prop-types';

const TodoList = ({ todos, toggleComplete }) => (

  <ul className="todo__list">
    {todos.map(todo => (
      <li className="todo__item" key={todo.id}>
        <h2 className="todo__title">
          {todo.title}
        </h2>
        <p className="todo__personName">
          {todo.person.name}
        </p>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={() => toggleComplete(todo.id)}
        />
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(object).isRequired,
  toggleComplete: PropTypes.func.isRequired,
};

export default TodoList;
