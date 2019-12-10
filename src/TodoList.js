import React from 'react';
import PropTypes from 'prop-types';

const TodoList = (props) => {
  const userId = todo => (
    props.users.find(user => (user.id === todo.userId)).id
  );

  return (
    <ul className="todo__list">
      {props.todoList.map(todo => (
        <li
          className="list__item"
          key={todo.title}
        >
          {`${todo.id}) ${todo.title}`}
          <span className="item__user-id">
            {`(User id: ${userId(todo)})`}
          </span>
        </li>
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todoList: PropTypes.arrayOf.isRequired,
  users: PropTypes.arrayOf.isRequired,
};

export default TodoList;
