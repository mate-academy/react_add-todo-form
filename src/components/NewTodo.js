import React from 'react';
import PropTypes from 'prop-types';
import { todosShape, usersShape } from '../shapes';

export class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
    this.titleRef = React.createRef();
    this.usersRef = React.createRef();
  }

  state = {
    addTodo: this.props.addTodo,
    users: this.props.users,
    todo: {
      userId: 0,
      id: this.props.todos.length,
      title: '',
      completed: false,
    },
    titleTemp: '',
  }

  onSubmit = (event) => {
    const todo = { ...this.state.todo };

    event.preventDefault();
    todo.title = this.state.titleTemp.trim();
    this.setState(() => ({
      todo: { ...todo },
    }), () => {
      if (todo.title.length !== 0 && todo.userId !== 0) {
        this.formRef.current.reset();
        this.setState({ titleTemp: '' });
        this.setState(prev => ({ todo: {
          ...prev.todo, id: prev.todo.id + 1,
        } }), () => {
          this.state.addTodo(this.state.todo);
          this.setState(prev => ({
            todo: {
              ...prev.todo, title: '', userId: 0,
            },
          }));
        });
      } else {
        if (todo.userId === 0) {
          this.usersRef.current.style.backgroundColor = 'red';
        }

        if (todo.title.length === 0) {
          this.titleRef.current.style.backgroundColor = 'red';
        }
      }
    });
  }

  onChangeInput = (event) => {
    this.titleRef.current.style.removeProperty('background-color');
    this.setState({
      titleTemp: event.target.value
        .replace(/[^\w\d\s]/ig, '')
        .replace('  ', ' '),
    });
  }

  onChangeSelect = (event) => {
    const todo = { ...this.state.todo };

    todo.userId = +event.target.value;
    this.usersRef.current.style.removeProperty('background-color');

    this.setState(() => ({
      todo: { ...todo },
    }));
  }

  render() {
    return (
      <form
        id="form"
        ref={this.formRef}
        onSubmit={this.onSubmit}
      >
        <input
          id="title"
          ref={this.titleRef}
          type="text"
          value={this.state.titleTemp}
          onChange={this.onChangeInput}
        />
        <select
          name="users"
          id="users"
          ref={this.usersRef}
          value={this.state.value}
          onChange={this.onChangeSelect}
        >
          <option value="0">Choose a user</option>

          {this.state.users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button type="submit">
          Submit
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(todosShape).isRequired,
  users: PropTypes.arrayOf(usersShape).isRequired,
};
