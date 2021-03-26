import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

export class AddTodoForm extends React.Component {
  state = {
    title: '',
    userId: '',
    hasTitleError: false,
    hasUserIdError: false,
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      hasTitleError: false,
    });
  }

  handleSelectChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: Number(value),
      hasUserIdError: false,
    });
  }

  handleSubmit= (event) => {
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
      this.setState({
        hasTitleError: false,
        hasUserIdError: false,
      });

      addTodo(title, userId);
      this.setState({
        userId: '',
        title: '',
      });
    }
  }

  render() {
    const { users } = this.props;
    const { title, hasTitleError, hasUserIdError } = this.state;

    return (
      <>
        <form
          onSubmit={this.handleSubmit}
          className="form"
        >
          <div className="error">
            {hasTitleError && (
              <div className="error__message">
                Enter your title, please!
              </div>
            )}

            {hasUserIdError && (
            <div className="error__message">
              Choose user, please!
            </div>
            )}
          </div>

          <input
            className="form__input form"
            type="text"
            name="title"
            placeholder="Needs to be done..."
            value={title}
            onChange={this.handleInputChange}
          />

          <select
            onChange={this.handleSelectChange}
            className="form__select form"
            name="userId"
            value={this.state.userId}
          >
            <option value="">
              Choose user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="form__button form"
          >
            Add Todo!
          </button>

        </form>
      </>
    );
  }
}

AddTodoForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
