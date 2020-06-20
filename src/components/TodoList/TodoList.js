import React from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem';

export const TodoList = ({ todos, setItemCompleted }) => (!todos.length
  ? <h2>No todos yet.</h2>
  : (
    <ul>
      {
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            handleOnCheck={setItemCompleted}
          />
        ))
      }
    </ul>
  ));

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  setItemCompleted: PropTypes.func.isRequired,
};
