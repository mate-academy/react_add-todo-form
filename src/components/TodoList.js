import PropTypes from 'prop-types';
import React from 'react';
import { Todo } from './Todo';
import { ShapeUser } from './Shapes';
import '../App.css';

const TodoList = ({ preparedTodos, handleStatus }) => (
  <>
    <table className="table">
      <caption>ToDo List</caption>
      <thead>
        <tr>
          <th>Status</th>
          <th>User id</th>
          <th>Title</th>
          <th>User</th>
        </tr>
      </thead>
      <tbody>
        {preparedTodos.map(item => (
          <Todo
            handleStatus={handleStatus}
            todo={item}
            userId={item.user.id}
            key={item.id}
          />
        ))}
      </tbody>
    </table>
  </>
);

TodoList.propTypes = {
  preparedTodos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: ShapeUser,
  })).isRequired,
  handleStatus: PropTypes.func.isRequired,
};

export default TodoList;
