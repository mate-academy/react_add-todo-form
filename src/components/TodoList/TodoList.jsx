import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';
import { TodoShape } from '../shapes/TodoShape';

export const TodoList = ({ todos }) => (
  <div className="todo__list">
    <div className="todo__header columns">
      <p className="column">#</p>
      <p className="column is-half">Task</p>
      <p className="column is-one-quarter">User</p>
      <p className="column checkbox">Is Done</p>
    </div>
    {
      todos.map(todo => (
        <Todo todo={todo} key={todo.id} />
      ))
    }
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoShape).isRequired,
};
