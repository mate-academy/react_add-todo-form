import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';

const TodoList = ({ todoList }) => (
  <div className="todo-list">
    {todoList.map(todo => <Todo key={todo.id} {...todo} />)}
  </div>
);

TodoList.propTypes = {
  todoList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};

export { TodoList };
