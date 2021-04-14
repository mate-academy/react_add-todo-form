import React from 'react';
import PropTypes, { object } from 'prop-types';

const TodosList = ({ todos, changeStatusComplete }) => (
  <div className="todo__container">
    {todos.map(todo => (
      <div className="todo__added" key={todo.id}>
        <p className="todo__title">
          <span className="todo__id">
            {todo.id}
            .
          </span>
          {todo.title}
        </p>
        <p className="todo__executant">
          Holder:
          <span className="todo__executant-name">
            {todo.executant.name}
          </span>
        </p>
        <div className="todo__check-status">
          <label
            htmlFor="completeStatus"
            className="todo__status"
          >
            Completed status:
          </label>
          <input
            type="checkbox"
            className="todo__checkbox"
            checked={todo.completed}
            onChange={() => changeStatusComplete(todo.id)}
          />
          {todo.completed
            ? (
              <p className="todo__done todo__is-complete">
                Is done. Congratulations!
              </p>
            )
            : (
              <p className="todo__done--not todo__is-complete">
                Task is not completed!
              </p>
            )}
        </div>
      </div>
    ))}
  </div>
);

TodosList.propTypes = {
  todos: PropTypes.arrayOf(object).isRequired,
  changeStatusComplete: PropTypes.func.isRequired,
};

export default TodosList;
