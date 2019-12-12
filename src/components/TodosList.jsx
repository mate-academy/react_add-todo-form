import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

class TodosList extends React.Component {
  render() {
    const { todo } = this.props;

    return (
      <div className="todo">
        <tbody>
          <tr className="todo-list">
            <td>{todo.id}</td>
            <td><User user={todo.user} /></td>
            <td>{todo.title}</td>
            <td>
              <input
                className="todo-check"
                type="checkbox"
                id={todo.id}
                defaultChecked={todo.completed}
              />
            </td>
          </tr>
        </tbody>
      </div>
    );
  }
}

TodosList.propTypes = {
  todo: PropTypes.shape({
    user: PropTypes.object.isRequired,
  }).isRequired,
};

export default TodosList;
