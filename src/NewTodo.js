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

    this.setState(prevState => ({
      todosMap: {
        ...prevState.todosMap,
        [name]: value,
      },
    }));
  };

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
        userName: 0,
      },
    });
  };

  render() {
    const { todosMap, errorsMap } = this.state;
    // const { users } = this.props;

    return (
      <form
        className="form"
        onSubmit={this.handleFormSubmit}
      >
        <select
          className="destination-details"
          name="userName"
          value={todosMap.userId}
          onChange={this.handleFieldChange}
        >
          <option value="" selected hidden>choose the user</option>
          {this.props.users.map(user => (
            <option
              key={user.id}
              value={user.name}
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
              id="new-todo-title"
              placeholder="Title"
              value={todosMap.title}
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
