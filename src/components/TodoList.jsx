import React from 'react';
import PropTypes from 'prop-types';

class TodoList extends React.PureComponent {
  render() {
    return (
      <table>
        <tbody>
          <tr>
            <th>Id</th>
            <th>userId</th>
            <th>Name</th>
            <th>Title</th>
            <th>Completed</th>
          </tr>
          {
            this.props.todos.map(todo => (
              <tr key={todo.id}>
                <th>{todo.id}</th>
                <th>{todo.userId}</th>
                <th>{todo.user.name}</th>
                <th>{todo.title}</th>
                <th>{todo.completed.toString()}</th>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape().isRequired,
  ).isRequired,
};

export default TodoList;
