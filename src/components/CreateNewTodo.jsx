import React from 'react';
import PropTypes from 'prop-types';
import users from '../api/users';

class CreateNewTodo extends React.Component {
  state = {
    title: '',
    userId: 0,
    errorsMap: {
      title: '',
      user: '',
    },
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const errorsMap = {};

    this.setState((state) => {
      if (!state.title) {
        errorsMap.title = 'Enter todo, please';
      }

      if (+state.userId === 0) {
        errorsMap.user = 'Select user, please';
      }

      if (Object.keys(errorsMap).length > 0) {
        return { errorsMap };
      }

      this.props.onSubmit({
        id: this.props.todos.length + 1,
        user: (+this.state.userId !== 0)
          ? users.find(user => +this.state.userId === +user.id)
          : {},
        title: this.state.title,
        complited: 'false',
      });
    });

    this.setState({
      userId: 0,
      title: '',
    });
  }

  handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;

    this.setState({
      [name]: value,
      errorsMap: {
        user: '',
        title: '',
      },
    });
  }

  render() {
    const { title, userId, errorsMap } = this.state;

    return (
      <form
        onSubmit={this.handleFormSubmit}
        className="form"
      >
        <div className="form-field">
          <label htmlFor="form-input">
            <input
              className="form-field_input"
              value={title}
              id="form-input"
              type="text"
              name="title"
              placeholder="Enter todo"
              onChange={this.handleChange}
            />
          </label>
          <div className="form-field_error">
            {errorsMap.title && (<div>{errorsMap.title}</div>)}
          </div>
          <label htmlFor="form-select">
            <select
              id="form-select"
              className="form-field_input"
              name="userId"
              value={userId}
              onChange={this.handleChange}
            >
              <option value="">Select user</option>
              {users.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <div className="form-field_error">
            {errorsMap.user && (<div>{errorsMap.user}</div>)}
          </div>
          <button
            type="submit"
            className="form-field_button"
          >
            Save
          </button>
        </div>
      </form>
    );
  }
}

CreateNewTodo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  todos: PropTypes.string.isRequired,
};

export default CreateNewTodo;
