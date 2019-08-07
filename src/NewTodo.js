import React from 'react';

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
    });
  }

  handleSubmitForm = (event) => {
    event.prevantDefault();

    const errorsMap = {};

    this.setState((prevstate) => {
      if (!prevstate.title) {
        errorsMap.title = 'Please, enter the task';
      }

      if (prevstate.user === 'Select the user') {
        errorsMap.title = 'Please, select the user';
      }

      if (Object.keys(errorsMap).length > 0) {
        return { errorsMap };
      }

      this.props.addTodo({
        id: this.props.todos.length + 1,
        user: this.state.user,
        title: this.state.title,
        completed: false,
      });
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmitForm}>
        <label htmlFor="inputField">
          <input
            type="text"
            id="inputField"
            name="title"
            value={this.state.title}
            placeholder="Enter your task"
            onChange={this.handleFieldChange}
          />
        </label>
        <select
          name="user"
          value={this.state.user}
          onChange={this.handleFieldChange}
        >
          <option>Select the user</option>
          {this.props.users.map(user => (<option>{user.name}</option>))}
        </select>
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default NewTodo;
