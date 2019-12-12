import React from 'react';
import PropTypes from 'prop-types';

const TodosTable = ({ todoList }) => (
  <>
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
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.shape(
        { name: PropTypes.string }
      ).isRequired,
    })
  ).isRequired,
};

export default TodosTable;
