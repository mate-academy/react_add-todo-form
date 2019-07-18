import PropTypes from 'prop-types';
import React from 'react';
import '../App.css';

class NewTodo extends React.Component {
  state = {
    todoMap: {
      userName: '',
      title: '',
    },

    errorsMap: {
      userName: '',
      title: '',
    },
  }

  handleFieldChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      todoMap: {
        ...prevState.todoMap,
        [name]: (name === 'title') ? value.replace(/[^\w]/, '') : value,
      },
      errorsMap: {
        ...prevState.errorsMap,
        [name]: '',
      },
    }));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { todoMap } = this.state;
    const { onSubmit } = this.props;

    if (!todoMap.userName) {
      this.setState(prevState => ({
        errorsMap: {
          ...prevState.errorsMap,
          userName: 'Please choose a user',
        },
      }));
    }

    if (!todoMap.title) {
      this.setState(prevState => ({
        errorsMap: {
          ...prevState.errorsMap,
          title: 'Please enter the title',
        },
      }));
    }

    if (todoMap.userName && todoMap.title) {
      onSubmit(todoMap);
      this.setState(prevState => ({
        todoMap: {
          ...prevState.todoMap,
          userName: '',
          title: '',
        },
      }));
    }
  }

  render() {
    const { users } = this.props;
    const { todoMap, errorsMap } = this.state;

    return (
      <fieldset>
        <legend>Add TODOs to the list of todos</legend>
        <form
          className="form"
          onSubmit={this.handleFormSubmit}
        >
          {/* jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
          {/* eslint-disable-next-line */}
          <label
            className="new-todo"
          >
            <span>Please, choose a user </span>
            <select
              name="userName"
              defaultValue={todoMap.userName}
              onChange={this.handleFieldChange}
            >
              <option value="" selected={!todoMap.userName}>User</option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.name}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {errorsMap.userName && (
            <div className="error">{errorsMap.userName}</div>
          )}
          <label
            className="new-todo"
            htmlFor="new-todo-title"
          >
            <span>Please, enter a title </span>
            <input
              id="new-todo-title"
              placeholder="Title"
              value={todoMap.title}
              name="title"
              type="text"
              onChange={this.handleFieldChange}
            />
          </label>
          {errorsMap.title && (
            <div className="error">{errorsMap.title}</div>
          )}
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
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewTodo;
