import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo/Todo';

const TodoList = ({ todos }) => (
  <ol className="TodoList">
    {todos.map(todo => (
      <li key={todo.id} className="TodoList__item">
        <Todo {...todo} />
      </li>
    ))}
  </ol>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({}),
  ).isRequired,
};

export default TodoList;
