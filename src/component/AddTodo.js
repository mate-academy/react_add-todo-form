import React from 'react';
import PropTypes from 'prop-types';

class AddTodo extends React.Component {
  state = {
    userId: 0,
    title: '',

    errors: {
      title: '',
      user: '',
    },
  }

  formSubmit = (event) => {
    const { newTodo, todos, users } = this.props;
    const errors = {};

    event.preventDefault();

    this.setState((prevState) => {
      if (!prevState.title) {
        errors.title = 'Please, enter new todo';
      }

      if (!prevState.userId) {
        errors.user = 'Invalid value, you should choose user from the list';
      }

      if (Object.keys(errors).length > 0) {
        return { errors };
      }

      newTodo({
        id: todos.length + 1,
        user: users.find(user => +prevState.userId === +user.id),
        completed: false,
        title: prevState.title,
      });

      return {};
    });

    this.setState({
      title: '',
      userId: 0,
    });
  };

  newTodoAdd = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.replace(/[^\w ]/, ''),

      errors: {
        title: '',
        user: '',
      },
    });
  };

  render() {
    const { title, userId, errors } = this.state;
    const { users } = this.props;

    return (
      <form className="newTodo" onSubmit={this.formSubmit}>
        <div>
          <label htmlFor="title">
            Print new todo:
            <input
              className="newTodo-title"
              type="text"
              name="title"
              id="title"
              value={title}
              maxLength="50"
              onChange={this.newTodoAdd}
              placeholder="Print new Todo"
            />
          </label>

          {errors.title && (
            <div className="error">
              {errors.title}
            </div>
          )}
        </div>

        <div>
          <span>Choose a user: </span>
          <select
            name="userId"
            onChange={this.newTodoAdd}
            value={userId}
            className="newTodo-user"
          >
            <option value={0} selected>User</option>

            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {errors.user && (
            <div className="error">
              {errors.user}
            </div>
          )}
        </div>

        <button type="submit" className="addBtn">
          Confirm
        </button>
      </form>
    );
  }
}

AddTodo.propTypes = {
  newTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AddTodo;
