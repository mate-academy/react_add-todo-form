import React from 'react';
import PropTypes from 'prop-types';

export class Todo extends React.Component {
  state = {

  }

  render() {
    const { todo } = this.props;

    return (
      <li>
        <p>{todo.title}</p>
        {todo.user.name && (
          <p>
            {todo.user.name}
          </p>
        )}
        <p>{todo.completed.toString()}</p>
      </li>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
