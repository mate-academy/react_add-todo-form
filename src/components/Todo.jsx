import React from 'react';
import PropTypes from 'prop-types';

export class Todo extends React.PureComponent {
  render() {
    const { todo, name } = this.props;
    const { id, title, completed } = todo;

    return (
      <article
        className="todo"
        key={id}
      >
        <h2
          className="todo__title"
        >
          {title}
        </h2>
        <p className="todo__subtitle">
          <b>Completed:</b>
          {completed ? 'Yes' : 'No'}
        </p>
        <p className="todo__subtitle">
          <b>User:</b>
          {name}
        </p>
      </article>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
};
