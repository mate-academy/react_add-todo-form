import React from 'react';
import PropTypes from 'prop-types';

import { Todo } from '../Todo';
import { TodoPropTypes } from '../propTypes/TodoPropTypes';

export const TodoList = ({ todos }) => (
  <div className="list-group m-3">
    {todos.map(todo => (
      <Todo
        key={todo.id}
        {...todo}
      />
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoPropTypes).isRequired,
};
