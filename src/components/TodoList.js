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
        <p>
          Person
          {' '}
          {todo.person.id}
          <br />
          {todo.person.name}
        </p>
        <input
          type="checkbox"
          checked={todo.complete}
          onChange={() => toggleComplete(todo.id)}
        />
        <p>{todo.completed ? 'Done' : 'In Process'}</p>
      </li>
    ))}
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(object).isRequired,
  toggleComplete: PropTypes.func.isRequired,
};

export default TodoList;
