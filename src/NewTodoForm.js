import React from 'react';
import PropTypes from 'prop-types';

class NewTodoForm extends React.Component {
  state = {
    user: '',
    title: '',
    hasErrors: {
      userError: false,
      titleError: false,
    },
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(state => ({
      [name]: value,
      hasErrors: {
        ...state.hasErrors,
        [name]: false,
      },
    }));
  }

  submitTodo = (event) => {
    event.preventDefault();

    const { user, title } = this.state;

    if (title && user) {
      this.props.addTodo(title, user);
      this.setState({
        user: '',
        title: '',
        hasErrors: {
          userError: false,
          titleError: false,
        },
      });
    }

    if (!user) {
      this.setState(state => ({
        hasErrors: {
          ...state.hasErrors,
          userError: true,
        },
      }));
    }

    if (!title) {
      this.setState(state => ({
        hasErrors: {
          ...state.hasErrors,
          titleError: true,
        },
      }));
    }
  }

  render() {
    const { user, title } = this.state;
    const { titleError, userError } = this.state.hasErrors;
    const { initUsers } = this.props;

    return (
      <form onSubmit={this.submitTodo}>
        <div>
          <label htmlFor="title">
            Enter title
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={this.handleChange}
            />
          </label>
          {titleError && (
            <div style={{ color: 'red' }}>
              Please enter the title
            </div>
          )}
        </div>
        <div>
          <label htmlFor="user">
            Select User
            <select
              type="text"
              name="user"
              value={user}
              onChange={this.handleChange}
            >
              <option value="">
                Choose a user
              </option>
              {initUsers.map(person => (
                <option
                  value={person.name}
                  key={person.id}
                >
                  {person.name}
                </option>
              ))}
            </select>
          </label>
          {userError && (
            <div style={{ color: 'red' }}>
              Please select a user
            </div>
          )}
        </div>
        <button
          type="submit"
        >
          click
        </button>
      </form>
    );
  }
}

NewTodoForm.propTypes = {
  initUsers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  addTodo: PropTypes.func.isRequired,
};
export default NewTodoForm;
