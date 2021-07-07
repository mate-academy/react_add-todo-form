import React from 'react';
import PropTypes from 'prop-types';
import Todo from '../Todo/Todo';
import { TodoShape } from '../shapes/TodoShape';

const TodoList = ({ todos }) => (
  <div className="d-flex flex-wrap justify-content-center">
    {todos.map(todo => <Todo key={todo.id} {...todo} />)}
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape(TodoShape)).isRequired,
};

export default TodoList;
