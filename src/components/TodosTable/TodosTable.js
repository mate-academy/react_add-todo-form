import React from 'react';
import PropTypes from 'prop-types';

const TodosTable = ({ todoList, userError, titleError }) => (
  <>
    <p className="errors">
      {userError}
      {titleError}
    </p>
    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>TODO</td>
          <td>Name</td>
        </tr>
      </thead>
      <tbody>
        {todoList.map(todo => (
          <tr key={todo.id}>
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>{todo.user.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

TodosTable.propTypes = {
  todoList: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  userError: PropTypes.string.isRequired,
  titleError: PropTypes.string.isRequired,
};

export default TodosTable;
