import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TodoList = ({ todos }) => (
  <table>
    <thead>
      <tr>
        <th>User</th>
        <th>Title</th>
        <th>Completed</th>
      </tr>
    </thead>

    <tbody>
      {
        todos.map(todo => (
          <tr key={todo.id}>
            <td>{ todo.user.name }</td>
            <td>{ todo.title }</td>
            <td>{ todo.completed ? 'Completed' : 'Uncompleted' }</td>
          </tr>
        ))
      }
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.objectOf(PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.boolean,
    users: PropTypes.objectOf(PropTypes.shape({
      name: PropTypes.string,
    })),
  })).isRequired,
};

const mapState = state => ({
  todos: state.todos,
});

export default connect(mapState)(TodoList);
