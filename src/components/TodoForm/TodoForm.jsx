import React from 'react';
import './TodoForm.css';
import PropTypes from 'prop-types';

class TodoForm extends React.Component {
  state = {
    completed: false,
    title: '',
    name: '',
    userId: 0,
    isValidationHasError: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      [name]: value,
    }));
  };

  findUser = (userName) => {
    if (this.state.name === '') {
      return 0;
    }

    return this.props.users.find(user => user.name === userName).id;
  }

  cleanState = () => {
    this.setState({
      completed: false,
      title: '',
      name: '',
      userId: null,
      isValidationHasError: false,
    });
  }

  addTodoAfterSubmit = (event) => {
    const createTodo = {
      userId: this.state.userId,
      title: this.state.title,
      completed: this.state.completed,
    };

    event.preventDefault();

    if (this.state.name === '') {
      return;
    }

    this.props.addTodo(createTodo);
    this.cleanState();
  }

  checkInputs = (value) => {
    if (value.length === 0 && this.state.isValidationHasError === true) {
      return false;
    }

    return true;
  }

  getUserId = () => {
    this.setState(prevState => ({
      userId: this.findUser(prevState.name),
      isValidationHasError: true,
    }));
  }

  render() {
    return (
      <form
        className="formTodo"
        method="POST"
        onSubmit={this.addTodoAfterSubmit}
      >
        <select
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
        >
          <option>Choose User</option>
          {this.props.users.map(user => (
            <option id={user.id} value={user.name} key={user.name}>
              {user.name}
            </option>
          ))}
        </select>
        { !this.checkInputs(this.state.name)
        && (
        <p className="error">
          Please choose a user
        </p>
        )
        }
        <input
          className="formInput"
          type="text"
          name="title"
          placeholder="Write new todo..."
          value={this.state.title}
          onChange={this.handleChange}
          required
        />

        { !this.checkInputs(this.state.title)
        && (
        <p className="error">
          Please enter the title
        </p>
        )
          }
        <button
          type="submit"
          className="formBtn"
          onClick={this.getUserId}
        >
          Add task
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default TodoForm;
