import React from 'react';
import PropTypes from 'prop-types';

const TodoDone = ({ todosDone, deleteTodo, todoInProgress }) => (
  <div className="todo-done__wrapper">
    <h2 className="todo-done__header">Tode is done:</h2>
    <ul className="todo__list">
      {todosDone.map(todo => (
        <li className="todo__item todo__item--done" key={todo.id}>
          <div className="todo__is-done">done</div>
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
                todoInProgress(todo.id, todo.title);
              }}
            >
              In Progress
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

TodoDone.propTypes = {
  todosDone: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  todoInProgress: PropTypes.func.isRequired,
};

export default TodoDone;
