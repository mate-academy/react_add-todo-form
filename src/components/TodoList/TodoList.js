import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList = ({ todos, itemCompleted }) => (!todos.length
  ? <h3>No todos yet.</h3>
  : (
    <ul>
      {
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleOnCheck={itemCompleted}
          />
        ))
      }
    </ul>
  ));

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  itemCompleted: PropTypes.func.isRequired,
};
