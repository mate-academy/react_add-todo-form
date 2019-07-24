import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

const TodoList = ({ todos }) => (
  <div>
    {todos.map(todo => (
      <TodoItem todo={todo} key={todo.id} />
    ))}
  </div>
);

TodoList.prototypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
