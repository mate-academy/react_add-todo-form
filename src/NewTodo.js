import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    todo: {
      title: '',
      userName: '',
    },
  }

  handleFieldChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      todo: {
        ...prevState.todo,
        [name]: value,
      },
    }));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { todo } = this.state;
    const { onSubmit } = this.props;

    onSubmit(todo);
    this.setState(prevState => ({
      todo: {
        ...prevState.todo,
        userName: '',
        title: '',
      },
    }));
  }

  render() {
    const { todo } = this.state;
    const { users } = this.state.props;

    return (
      <fieldset>
        <legend>Add TODOs</legend>
        <form
          className="form"
          onSubmit={this.handleFormSubmit}
        >
          <select
            name="userName"
            defaultValue={todo.userName}
            onChange={this.handleFieldChange}
          >
            <option value="" selected disabled hidden>choose the user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>
          <label
            className="new-todo"
            htmlFor="new-todo-title"
          >
            <span>Please, enter a title </span>
            <input
              id="new-todo-title"
              placeholder="Title"
              value={todo.title}
              name="title"
              type="text"
              onChange={this.handleFieldChange}
            />
          </label>
          <button
            className="btn-add"
            type="submit"
          >
            Add
          </button>
        </form>
      </fieldset>
    );
  }
}

NewTodo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default NewTodo;
