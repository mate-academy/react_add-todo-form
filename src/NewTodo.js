import React from 'react';
import propTypes from 'prop-types';
import users from './api/users';

class NewTodo extends React.Component {
  state = {
    title: '',
    userId: '',
    completed: false,
    titleError: false,
    userError: false,
  };

  addTodo = (event) => {
    event.preventDefault();
    const check = /[0-9a-fA-F]+/g;

    if (
      this.state.title !== ''
      && check.test(this.state.title.key)
      && this.state.userId !== ''
    ) {
      const newTodoItem = {
        userId: +this.state.userId,
        id: this.props.todos.length + 1,
        title: this.state.title,
        completed: this.state.completed,
      };

      this.props.update(newTodoItem);

      this.setState({
        title: '',
        userId: '',
        completed: false,
      });
    }

    if (this.state.title === '' || check.test(this.state.title.key)) {
      this.setState({
        titleError: true,
      });
    }

    if (this.state.userId === '') {
      this.setState({
        userError: true,
      });
    }
  };

  handleChange = (event) => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState(prevState => ({
      [name]: value,
      titleError: name === 'title' ? false : prevState.titleError,
      userError: name === 'userId' ? false : prevState.userError,
    }));
  };

  render() {
    return (
      <form onSubmit={this.addTodo}>
        <h4>Add new TODO here</h4>
        <label htmlFor="title">
          Todo:
          <input
            className="title"
            name="title"
            id="title"
            type="text"
            onChange={this.handleChange}
            value={this.state.title}
          />
        </label>
        {
          this.state.titleError === true
            ? (<p className="err"> Please enter a valid TODO</p>)
            : ''
        }
        <div>
          User:
          <br />
          <select
            name="userId"
            id="selectUser"
            onChange={this.handleChange}
            value={this.state.userId}
          >
            <option value="select">Select author</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {
            this.state.userError === true
              ? (<p className="err"> Please select author of TODO</p>)
              : ''
          }
        </div>
        <label htmlFor="checked">
          checked:
          <input
            type="checkbox"
            name="completed"
            onChange={this.handleChange}
            value={this.state.completed}
          />
        </label>
        <button type="submit">Add</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  update: propTypes.func.isRequired,
  todos: propTypes.arrayOf(propTypes.object).isRequired,

};

export default NewTodo;
