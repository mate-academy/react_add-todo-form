import React from 'react';
import PropTypes from 'prop-types';

export class TodoList extends React.PureComponent {
  render() {
    const { todos } = this.props;

    return (
      <div>
        <table className="table is-hoverable">
          <thead>
            <tr>
              <th>User</th>
              <th>Task</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id} className="todoList">
                <td>{todo.user.name}</td>
                <td>{todo.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    }),
  ).isRequired,
};
