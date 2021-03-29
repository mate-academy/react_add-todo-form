import React from 'react';
import PropTypes from 'prop-types';

export class TodoForm extends React.Component {
  state = {
    title: '',
    userId: '',
    hasTitleError: false,
    hasUserIdError: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });

    if (name === 'title') {
      this.setState({
        hasTitleError: false,
      });
    }

    if (name === 'userId') {
      this.setState({
        hasUserIdError: false,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, userId } = this.state;
    const { addTodo } = this.props;

    if (!title) {
      this.setState({
        hasTitleError: true,
      });
    }

    if (!userId) {
      this.setState({
        hasUserIdError: true,
      });
    }

    if (title && userId) {
      addTodo(title, userId);

      this.setState({
        title: '',
        userId: '',
      });
    }
  };

  render() {
    const {
      title,
      userId,
      hasTitleError,
      hasUserIdError,
    } = this.state;

    const { users } = this.props;

    return (
      <>
        {hasTitleError && (
          <p className="App__error">
            <span className="App__error-title">Error: </span>
            Please enter the title
          </p>
        )}
        {hasUserIdError && (
          <p className="App__error">
            <span className="App__error-title">Error: </span>
            Please choose a user
          </p>
        )}
        <form
          onSubmit={this.handleSubmit}
          className="App__form"
        >
          <label>
            Title:
            {' '}
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={this.handleChange}
            />
          </label>
          <label>
            User:
            {' '}
            <select
              name="userId"
              placeholder="Choose a user"
              value={userId}
              onChange={this.handleChange}
            >
              <option value="">
                Choose a user
              </option>
              {users.map(({ id, name }) => (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Add todo</button>
        </form>
      </>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
