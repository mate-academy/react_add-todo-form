import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from '../TodoItem/TodoItem';

function TodoList({ todos }) {
  return (
    <div className="todos-list">
      {todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf.isRequired,
};

export default TodoList;
