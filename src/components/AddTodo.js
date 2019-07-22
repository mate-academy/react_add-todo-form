import React from 'react';
import PropTypes from 'prop-types';

class AddTodo extends React.Component {
  state = {
    userId: 0,
    title: '',

    errorsMap: {
      title: '',
      user: '',
    },
  }

  handleFormSubmit = (event) => {
    const { addNewTodo, todos, users } = this.props;
    const errorsMap = {};

    event.preventDefault();

    this.setState((prevState) => {
      if (!prevState.title) {
        errorsMap.title = 'Todo is required';
      }

      if (+prevState.userId === 0) {
        errorsMap.user = 'Please, choose a user';
      }

      if (Object.keys(errorsMap).length > 0) {
        return { errorsMap };
      }

      addNewTodo({
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

  handleFieldChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value.replace(/[^\w ]/, ''),

      errorsMap: {
        title: '',
        user: '',
      },
    });
  };

  render() {
    const { title, userId, errorsMap } = this.state;
    const { users } = this.props;

    return (
      <form className="new-Todo" onSubmit={this.handleFormSubmit}>
        <div>
          <label htmlFor="title">
            Print new todo:
            <input
              className="new-Todo__title"
              type="text"
              name="title"
              id="title"
              value={title}
              maxLength="30"
              onChange={this.handleFieldChange}
              placeholder="Print new Todo"
            />
          </label>

          {errorsMap.title && (
            <div className="error" style={{ color: 'red' }}>
              {errorsMap.title}
            </div>
          )}
        </div>

        <div>
          <span>Choose a user: </span>
          <select
            name="userId"
            onChange={this.handleFieldChange}
            value={userId}
            className="new-Todo__user"
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

          {errorsMap.user && (
            <div className="error" style={{ color: 'red' }}>
              {errorsMap.user}
            </div>
          )}
        </div>

        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    );
  }
}

AddTodo.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default AddTodo;
