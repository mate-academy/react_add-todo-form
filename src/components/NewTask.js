import PropTypes from 'prop-types';
import React from 'react';
import '../App.css';

class NewTask extends React.Component {
  state = {
    todoList: {
      userName: '',
      title: '',
    },

    errors: {
      userName: '',
      title: '',
    },
  };

  handleFieldChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      todoList: {
        ...prevState.todoList,
        [name]: (name === 'title') ? value.replace(/[^\w]/, '') : value,
      },
      errors: {
        ...prevState.errors,
        [name]: '',
      },
    }));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { todoList } = this.state;
    const { onSubmit } = this.props;

    if (!todoList.userName) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          userName: 'Please choose a user',
        },
      }));
    }

    if (!todoList.title) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          title: 'Please enter the title',
        },
      }));
    }

    if (todoList.userName && todoList.title) {
      onSubmit(todoList);
      this.setState(prevState => ({
        todoList: {
          ...prevState.todoList,
          userName: '',
          title: '',
        },
      }));
    }
  };

  render() {
    const { users } = this.props;
    const { todoList, errors } = this.state;

    return (
      <div className="todoListMain">
        <div className="header">
          <form
            className="form"
            onSubmit={this.handleFormSubmit}
          >
            <p>
              {/* eslint-disable-next-line  */}
              <label
                htmlFor="new-task"
              >
                Add item
              </label>
              <input
                id="new-task"
                placeholder="Add a new task..."
                value={todoList.title}
                name="title"
                type="text"
                onChange={this.handleFieldChange}
              />
              <button type="submit">Add</button>
            </p>
            <p>
              {/* eslint-disable-next-line  */}
              <label htmlFor="new-task">Select User</label>
              <select
                name="userName"
                defaultValue={todoList.userName}
                onChange={this.handleFieldChange}
              >
                <option value="" selected={!todoList.userName}>User</option>
                {users.map(user => (
                  <option
                    key={user.id}
                    value={user.name}
                  >
                    {user.name}
                  </option>
                ))}
              </select>
            </p>
            <h3>Todo</h3>
            {errors.userName && (
              <div className="error">{errors.userName}</div>
            )}
            {errors.title && (
              <div className="error">{errors.title}</div>
            )}
          </form>
        </div>
      </div>
    );
  }
}

NewTask.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default NewTask;
