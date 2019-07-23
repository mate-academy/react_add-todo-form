import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    todosMap: {
      title: '',
      userName: '',
    },

    errorsMap: {
      title: '',
      userName: '',
    },
  }

  handleFieldChange = (event) => {
    const { name, value } = event.target;

    this.setState(({ todosMap }) => ({
      todosMap: {
        ...todosMap,
        [name]: value.replace(/[^\w]/, ''),
      },
    }));
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(({ todosMap }) => ({
      todosMap: {
        ...todosMap,
        [name]: value,
      },
    }));
  };

  handleInputFocus = (event) => {
    const errorClear = event.target.name;

    this.setState(prevState => ({
      ...prevState,
      errorsMap: {
        ...prevState.errorsMap,
        [errorClear]: false,
      },
    }));
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { todosMap } = this.state;
    const { onSubmit } = this.props;
    const errorsMap = {};

    this.setState((prevState) => {
      if (!prevState.todosMap.title) {
        errorsMap.title = 'Please enter the title';
      }

      if (!prevState.todosMap.userName) {
        errorsMap.userName = 'Please enter the user';
      }

      if (Object.keys(errorsMap).length > 0) {
        return { errorsMap };
      }

      onSubmit(todosMap);

      return {};
    });

    this.setState({
      todosMap: {
        title: '',
        userName: '',
      },
    });
  };

  render() {
    const { todosMap, errorsMap } = this.state;
    const { users } = this.props;

    return (
      <form
        className="form"
        onSubmit={this.handleFormSubmit}
      >
        <select
          id="userName"
          className="destination-details"
          name="userName"
          onFocus={this.handleInputFocus}
          value={todosMap.userName}
          onChange={this.handleChange}
        >
          <option
            value=""
            disabled
            hidden
            selected
          >
            choose the user
          </option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.name}
              name="userName"
            >
              {user.name}
            </option>
          ))}
        </select>
        {errorsMap.userName && (
          <div className="error">
            {errorsMap.userName}
          </div>
        )}
        <br />
        <div>
          <label
            className="new-todo"
            htmlFor="new-todo-title"
          >
            <input
              id="title"
              placeholder="Title"
              value={todosMap.title}
              onFocus={this.handleInputFocus}
              name="title"
              type="text"
              onChange={this.handleFieldChange}
            />
          </label>
          {errorsMap.title && (
            <div className="error">
              {errorsMap.title}
            </div>
          )}
        </div>
        <button
          className="btn-add"
          type="submit"
        >
            Add
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewTodo;
