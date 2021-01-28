import React from 'react';
import PropTypes from 'prop-types';

export class Todo extends React.Component {
  state = {
    title: this.props.todo.title,
  }

  render() {
    const { todo, deleteTask, renameTask } = this.props;

    return (
      <>
        <div>
          <p className="title">{todo.title}</p>
          <form onSubmit={(event) => {
            event.preventDefault();
            renameTask(todo.id, this.state.title);
          }}
          >
            <textarea
              className="title-input"
              value={this.state.title}
              onChange={(event) => {
                this.setState({
                  title: event.target.value,
                });
              }}
            />
            <button type="submit" className="change">Change</button>
          </form>
        </div>
        <div className="container">
          <p>{todo.name}</p>
          <p>{todo.completed ? 'finished' : 'unfinished'}</p>
        </div>
        <button
          className="delete"
          type="submit"
          onClick={() => deleteTask(todo.id)}
        >
          delete
        </button>
      </>
    );
  }
}

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,

  }).isRequired,
  deleteTask: PropTypes.func.isRequired,
  renameTask: PropTypes.func.isRequired,
};
