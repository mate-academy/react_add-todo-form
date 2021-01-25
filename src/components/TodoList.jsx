import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ todosList }) => (
  <>
    {todosList.map(todo => (
      <tr key={todo.id}>
        <td data-label="Name">{todo.user.name}</td>
        <td data-label="Title">{todo.title}</td>
        <td data-label="Status" className={todo.completed? "positive" : "error"}>
          {todo.completed
            ? "Completed"
            : "In Progress"
          }
        </td>
      </tr>
    ))}
  </>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }))
};

export default TodoList;
