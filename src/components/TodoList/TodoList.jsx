import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo/Todo';

const TodoList = ({ todos }) => (
  <>
    {todos.map((todo) => (
    <Todo
      key={todo.id}
      keyID ={todo.id}
      title={todo.title}
      user={todo.user}
    />
  ))}
  </>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool,
    title: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  })),
}

export default TodoList;
