import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    title: '',
    user: '',

    errorsMap: {
      title: '',
      user: '',
    },
  }

  handleFieldChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
      errorsMap: {
        title: '',
        user: '',
      },
    });
  }

  clearForm = () => {
    this.setState({
      title: '',
      user: '',
    });
  }

  handleSubmitForm = (event) => {
    event.preventDefault();

    const errorsMap = {};

    this.setState((prevstate) => {
      if (!prevstate.title) {
        errorsMap.title = 'Please, enter the task';
      }

      if (!prevstate.user) {
        errorsMap.user = 'Please, select the user';
      }

      if (Object.keys(errorsMap).length > 0) {
        return { errorsMap };
      }

      const userForId = this.props.users.find(
        user => user.name === prevstate.user
      );

      this.props.addTodo({
        userId: userForId.id,
        id: this.props.todos.length + 1,
        title: prevstate.title,
        completed: false,
        user: this.props.users.find(user => userForId.id === user.id),
      });

      return '';
    });

    this.clearForm();
  }

  render() {
    const { errorsMap } = this.state;

    return (
      <form onSubmit={this.handleSubmitForm}>
        <div className="formItem">
          <label htmlFor="inputField">
            <input
              type="text"
              id="inputField"
              name="title"
              className="formField"
              value={this.state.title}
              placeholder="Enter your task"
              onChange={this.handleFieldChange}
            />
          </label>
          {errorsMap.title && (
            <div className="error">{errorsMap.title}</div>
          )}
        </div>
        <div className="formItem">
          <select
            name="user"
            id="selectField"
            className="formField"
            value={this.state.user}
            onChange={this.handleFieldChange}
          >
            <option selected hidden>Select the user</option>
            {this.props.users.map(
              user => (<option key={user.id}>{user.name}</option>)
            )}
          </select>
          {errorsMap.user && (<div className="error">{errorsMap.user}</div>)}
        </div>
        <div className="formItem">
          <button
            type="submit"
            className="formButton"
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
