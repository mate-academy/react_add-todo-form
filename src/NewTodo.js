import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    todosMap: {
      title: '',
      userName: '',
    },
    // errorsMap: {
    //   title: '',
    //   userName: '',
    // }
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

    onSubmit(todosMap);
    this.setState(prevState => ({
      todosMap: {
        ...prevState.todosMap,
        userName: 0,
        title: '',
      },
    }));
  }

  render() {
    const { todosMap } = this.state;
    // const { users } = this.props;

    return (
      <form
        className="form"
        onSubmit={this.handleFormSubmit}
      >
        <select
          className="destination-details"
          name="userName"
          onChange={this.handleFieldChange}
        >
          <option value="" selected disabled hidden>choose the user</option>
          {this.props.users.map(user => (
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
            value={todosMap.title}
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
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewTodo;
