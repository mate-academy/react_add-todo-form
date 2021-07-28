import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import Todo from '../Todo/Todo';

const TodoList = ({ todos }) => (
  <section className="todos">
    <h1 className="todos-title">Todos List</h1>
    <div className="todos-list">
      {todos.map(todo => (
        <Todo
          {...todo}
          key={todo.id}
        />
      ))}
    </div>
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({}).isRequired,
    }),
  ).isRequired,
};

export default TodoList;
