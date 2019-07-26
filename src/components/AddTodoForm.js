import React from 'react';
import PropTypes from 'prop-types';

class AddTodoForm extends React.Component {
  state = {
    title: '',
    userId: 0,
    completed: false,
    errorTitle: '',
    errorUserId: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userId, completed } = this.state;

    if (title && userId !== 0) {
      this.props.addTodo(title, userId, completed);
      this.setState({
        title: '',
        userId: 0,
        completed: false,
      });

      return;
    }

    if (!title) {
      this.setState({
        errorTitle: ' Please enter the title',
      });
    }

    if (userId === 0) {
      this.setState({
        errorUserId: ' Please choose a user',
      });
    }
  };

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
      errorTitle: '',
    });
  };

  handleSelectChange = (event) => {
    this.setState({
      userId: +event.target.value,
      errorUserId: '',
    });
  };

  handleCompletedChange = (event) => {
    this.setState({
      completed: event.target.checked,
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-field">
          <label htmlFor="new-todo-title">
            Todo Title:
            {' '}
            <input
              id="new-todo-title"
              type="text"
              name="title"
              placeholder="Add new todo"
              value={this.state.title}
              onChange={this.handleTitleChange}
            />
            {this.state.errorTitle && (
              <span
                className="error"
                style={{ color: 'red' }}
              >
                {this.state.errorTitle}
              </span>
            )}
          </label>
        </div>
        <div className="form-field">
          { /* eslint-disable-next-line */ }
          <label htmlFor="new-todo-user-id">
            {' Performer: '}
            <select
              id="new-todo-user-id"
              name="userId"
              value={this.state.userId}
              onChange={this.handleSelectChange}
            >
              <option value={0}>Choose a user</option>
              {this.props.users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            {this.state.errorUserId && (
              <span
                className="error"
                style={{ color: 'red' }}
              >
                {this.state.errorUserId}
              </span>
            )}
          </label>
        </div>
        <div className="form-field">
          <label htmlFor="new-todo-completed">
            {' '}
            Completed:
            {' '}
            <input
              id="new-todo-completed"
              type="checkbox"
              onChange={this.handleCompletedChange}
              checked={this.state.completed}
            />
          </label>
        </div>
        <button type="submit">Add</button>
      </form>
    );
  }
}

AddTodoForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default AddTodoForm;
