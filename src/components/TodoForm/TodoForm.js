import React, { Component } from 'react';
import './TodoForm.css';
import todos from '../../api/todos';
import users from '../../api/users';

class TodoForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedUser: 0,
      title: null,
      users: [...users],
      todos: [...todos],
    };
  }

  componentDidMount() {
    this.props.getDatas(this.state.todos, this.state.users);
  }

  selectUser = (event) => {
    this.setState({
      selectedUser: event.target.value,
    });
  }

  makeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  createToDo = (event) => {
    event.preventDefault();
    this.setState((prev) => {
      const newToDo = {
        userId: +prev.selectedUser,
        id: prev.todos.length + 1,
        title: prev.title,
        completed: false,
      };

      this.state.todos.push(newToDo);
      this.props.getDatas(this.state.todos, this.state.users);

      return {
        newToDo,
      };
    });
  }

  render() {
    return (
      <form className="todo__form form" onSubmit={this.createToDo}>
        <input className="form__text" type="text" placeholder="Title" onChange={this.makeTitle} required="required" pattern="[a-zA-Z | \s | \d]{0,100}$" />
        <select className="form__select" value={this.state.selectedUser} onChange={this.selectUser} required="required">
          <option value={0} disabled>Select an user:</option>
          {this.state.users.map((user, i) => (
            <option key={user} value={user.id}>{user.name}</option>
          ))}
        </select>
        <input type="submit" value="Add todo" className="form__button" />
      </form>
    );
  }
}

export default TodoForm;
