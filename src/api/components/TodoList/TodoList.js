import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

const TodoList = ({ todos: copyTodos }) => (
  <div className="container">
    {copyTodos.map(todo => (
      <TodoItem
        todo={todo}
        key={todo.id}
      />
    ))}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
}

export default TodoList;
