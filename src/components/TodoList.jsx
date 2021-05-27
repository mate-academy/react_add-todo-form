import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (
      <li key={todo.id}>
        {`${todo.title} - ${todo.user.name}`}
      </li>
    ))}
  </ul>
);

const TypeTodo = PropTypes.shape({
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  user: PropTypes.shape().isRequired,
});

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TypeTodo).isRequired,
};

export default TodoList;
