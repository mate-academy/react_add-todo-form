import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NewTodo from '../NewTodo/NewTodo';

const TodoList = ({ todos }) => (
  <section className="container">
    <h1 className="container-header">Things to do</h1>
    <table className="table">
      <thead>
        <tr className="table__header">
          <th>Id</th>
          <th>Title</th>
          <th>User</th>
          <th>Completed</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <tr className="table__body">
            <td>{todo.id}</td>
            <td>{todo.title}</td>
            <td>{todo.user.name}</td>
            <td>{todo.completed ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <NewTodo />
  </section>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

const mapState = ({ todos }) => ({ todos });

export default connect(mapState)(TodoList);
