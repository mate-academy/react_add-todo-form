import React from 'react';
import PropTypes from 'prop-types';

const TodoList = ({ list }) => (

  <table className="table mt-5">
    <thead className="thead-dark">
      <tr>
        <th scope="col">Todo ID</th>
        <th scope="col">User ID</th>
        <th scope="col">User Name</th>
        <th scope="col">Todo</th>
      </tr>
    </thead>
    <tbody>
      {list.map(todo => (
        <tr key={todo.id}>
          <td>{todo.id}</td>
          <td>{todo.userId}</td>
          <td>{todo.userName}</td>
          <td>{todo.title}</td>
        </tr>
      ))}

    </tbody>
  </table>
);

TodoList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool]))),
};

TodoList.defaultProps
  = {
    list: [],
  };
export default TodoList;
