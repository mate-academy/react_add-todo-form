import React from 'react';
import PropTypes from 'prop-types';
import { TodoType } from '../typedefs/todoType';

const TodoList = ({ todos }) => (
  <ul className="todo__list">
    {todos.map((todo) => {
      const { id, user, title, completed } = todo;

      return (
        <li key={id} className="todo__item">
          <h2 className="todo__username">
            {user.name}
          </h2>
          <p className="todo__title">
            {title}
          </p>
          {completed
            ? <span className="todo__completed todo__completed--success" />
            : <span className="todo__completed todo__completed--danger" />
          }
        </li>
      );
    })
    }
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoType).isRequired,
};

export default TodoList;
