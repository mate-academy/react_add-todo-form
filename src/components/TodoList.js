import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos, deleteTodo, todoDone }) => (
  <div className="todo__wrapper">
    <h2 className="todo__header">Tode in progress:</h2>
    <ul className="todo__list">
      {todos.map(todo => (
        <li className="todo__item" key={todo.id}>
          <p className="todo__number">
            Number of todo: &nbsp;
            <span className="todo__number-text">{todo.userId}</span>
          </p>
          <p className="todo__title">
            Title:&nbsp;
            <span className="todo__title-text">{todo.title}</span>
          </p>

          <div className="todo__button-wrapper">
            <button
              className="todo__button button"
              type="button"
              onClick={() => {
                todoDone(todo.id, todo.title);
              }}
            >
              Is Done
            </button>
            <button
              className="todo__button-delete button"
              type="button"
              onClick={() => deleteTodo(todo.title)}
            >
              Delete todo
            </button>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todoDone: PropTypes.func.isRequired,
};

export default TodoList;
