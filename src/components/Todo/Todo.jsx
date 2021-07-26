import classNames from 'classnames';
import React from 'react';
import propTypes from 'prop-types';
import { UserType } from '../../Types';

export const Todo = ({ user }) => {
  const { name, todos } = user;

  return (
    <>
      {todos.map(todo => (
        <tr className="todoList__row" key={todo.id}>
          <td className="todoList__item">
            {todo.id}
          </td>

          <td className="todoList__item">
            {todo.title}
          </td>

          <td className={classNames(
            'todoList__item', {
              Completed: todo.completed,
              notCompleted: !todo.completed,
            },
          )}
          >
            {todo.completed ? 'Completed' : 'Not completed yet'}
          </td>

          <td className="todoList__item">
            {name}
          </td>
        </tr>
      ))}
    </>
  );
};

Todo.propTypes = {
  user: propTypes.shape(UserType).isRequired,
};
