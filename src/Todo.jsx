import React from 'react';
import PropTypes from 'prop-types';

export class Todo extends React.Component {
  state = {
    title: this.props.todo.title,
  }

  // componentDidUpdate(prevProps) {
  //   if (prevProps.todo.title !== this.props.todo.title) {
  //     this.setState({
  //       title: this.props.todo.title,
  //     });
  //   }
  // }

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
              type="text"
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
  todo: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
  })).isRequired,
  deleteTask: PropTypes.objectOf.isRequired,
  renameTask: PropTypes.objectOf.isRequired,
};
