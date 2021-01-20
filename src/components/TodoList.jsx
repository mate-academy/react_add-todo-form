import React from 'react';
import PropTypes from 'prop-types';

export class TodoList extends React.PureComponent {
  render() {
    const { todos } = this.props;

    return (
      <div className="todos_list">
        {todos.map(todo => (
          <article
            className="todo"
            key={todo.id}
          >
            <h2
              className="todo__title"
            >
              {todo.title}
            </h2>
            <p className="todo__subtitle">
              <b>Completed:</b>
              {todo.completed ? 'No' : 'Yes'}
            </p>
            <p className="todo__subtitle">
              <b>User:</b>
              {todo.user.name}
            </p>
          </article>
        ))}
      </div>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
  })).isRequired,
};
