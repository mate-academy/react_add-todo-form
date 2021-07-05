import React from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

const TodoList = ({ todos }) => (
  <div className="todo-list">
    <span className="todo-list__cell">#</span>
    <span className="todo-list__cell">Todo</span>
    <span className="todo-list__cell">Status</span>
    <span className="todo-list__cell">User Id</span>
    <>
      {todos.map(todo => <Todo key={todo.id} item={todo} />)}
    </>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default TodoList;
