import React from 'react';
import './TodoForm.css';
import PropTypes from 'prop-types';

class TodoForm extends React.Component {
  state = {
    completed: false,
    title: '',
    name: '',
    userId: 0,
    id: null,
    isButtonCliked: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  findUser = (array, userName, event) => {
    this.setState({ id: this.props.todos.length + 1 });

    if (this.state.name === '') {
      return 0;
    }

    return array.find(user => user.name === userName).id;
  }

  cleanState = () => {
    this.setState({
      completed: false,
      title: '',
      name: '',
      userId: null,
      id: null,
      isButtonCliked: false,
    });
  }

  addTodoAfterSubmit = (event) => {
    const createTodo = {
      id: this.state.id,
      userId: this.state.userId,
      title: this.state.title,
      completed: this.state.completed,
    };

    event.preventDefault();

    if (this.state.name === '') {
      return 0;
    }

    this.props.getToUpdate(createTodo);
    this.cleanState();
  }

  checkInputs = (value) => {
    if (value.length === 0 && this.state.isButtonCliked === true) {
      return false;
    }

    return true;
  }

  render() {
    return (
      <form
        className="formTodo"
        method=""
        onSubmit={this.addTodoAfterSubmit}
      >
        <select
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          required
        >
          <option>Choose User</option>
          {this.props.users.map(user => (
            <option id={user.id} value={user.name}>
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
          onClick={() => this.setState(prevState => ({
            userId: this.findUser(this.props.users, prevState.name),
            isButtonCliked: true,
          }))}
        >
          Add task
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  todos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  getToUpdate: PropTypes.func.isRequired,
};

export default TodoForm;
