import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.css';

export class TodoList extends React.Component {
  state = {}

  static propTypes = {
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        user: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      }),
    ).isRequired,
  }

  render() {
    const { todos } = this.props;

    return (
      <ul className="list">
        {todos.map(todo => (
          <li key={todo.id} className="list__item">
            <p>{todo.user.name}</p>
            <p>{todo.title}</p>
            <p>{(todo.completed) ? `Completed` : `In progress`}</p>
          </li>
        ))}
      </ul>
    );
  }
}
