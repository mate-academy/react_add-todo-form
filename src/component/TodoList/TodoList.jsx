import React from 'react';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';

export class TodoList extends React.Component {
  state = {

  }

  render() {
    const { todos } = this.props;

    return (
      <ul>
        {todos.map(todo => (
          <Todo todo={todo} key={todo.id}/>
        ))}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};
