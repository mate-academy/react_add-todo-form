import React from 'react';
import PropTypes from 'prop-types';
import { ShapeUser } from '../Shapes/ShapeUser';

export class NewTodo extends React.PureComponent {
  render() {
    const {
      users,
      currentUserId,
      currentTodo,
      isActiveAdd,
      onSubmit,
    } = this.props;

    return (
      <div>
        <form onSubmit={event => onSubmit(event)}>
          <select onChange={event => currentUserId(event)}>
            <option>Choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Type todo"
            onChange={event => currentTodo(event)}
          />
          <button
            type="submit"
            disabled={!isActiveAdd}
          >
            Add
          </button>
        </form>

      </div>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(ShapeUser).isRequired,
  currentUserId: PropTypes.func.isRequired,
  currentTodo: PropTypes.func.isRequired,
  isActiveAdd: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
