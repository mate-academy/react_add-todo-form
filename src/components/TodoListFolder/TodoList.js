import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.css';
import { Todo } from '../Todo';
import { prepearedTodosType } from '../UserFolder';

export function TodoList({ todos }) {
  return (
    <>
      {todos.map(todo => (
        <div
          key={todo.id}
          className={classNames(`row`,
            { even: todo.id % 2 === 0 })}
        >
          <Todo {...todo} />
        </div>
      ))}
    </>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape(
    prepearedTodosType,
  )).isRequired,
};
