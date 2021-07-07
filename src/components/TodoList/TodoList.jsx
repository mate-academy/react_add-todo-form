import React from 'react';
import PropTypes from 'prop-types';
import TodoShape from '../../shapes/TodoShape';

const TodoList = ({ todos }) => (
  <div className="list-container">
    <h2 className="heading">Todo List</h2>
    <ul className="list">
      {todos.map(todo => (
        <li
          key={todo.id}
          className="list__item item"
        >
          <span className="item__user">{`${todo.user.name}: `}</span>
          <span className="item__title">{todo.title}</span>
          <input
            type="checkbox"
            className="item__checkbox"
          />
        </li>
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TodoShape).isRequired,
};

export default React.memo(TodoList);
