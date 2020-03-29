import React, { Component } from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { getTodosWithUsers } from './getTodos';

export class App extends Component {
  state = {
    newTodos: [...todos],
    newUsers: [...users],
    text: '',
    selectedOption: 0,
    textError: null,
    selectError: null,
  }

  handleSelect = ({ target }) => {
    if (target.value !== 0) {
      this.setState({
        selectError: null,
      });
    }
    this.setState({
      selectedOption: target.value,
    });
  }

  handleChange = ({ target }) => {
    if (target.value !== 0) {
      this.setState({
        textError: null,
      });
    }
    this.setState({
      text: target.value.trimStart(),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.selectedOption === 0) {
      this.setState({
        selectError: 'Error! Please, select user',
      });
    } else if (this.state.text === '' || this.state.text === ' ') {
      this.setState({
        textError: 'Please enter the title',
      });
    } else {
      const newTodo = {
        userId: Number(this.state.selectedOption),
        id: this.state.newTodos.length + 1,
        title: this.state.text,
        completed: false,
      };
      this.setState(prevState => ({
        newTodos: [...prevState.newTodos, newTodo],
      }));

      this.setState({
        text: '',
        selectedOption: 0,
        selectError: null,
      });
    }
  }

  render() {
    const preparedTodos = getTodosWithUsers(
      this.state.newTodos, this.state.newUsers
    );

    return (
      <div className="App">
        <p>
          <span>Users: </span>
          {this.state.newUsers.length}
        </p>
        <p>
          <span>Todos: </span>
          {this.state.newTodos.length}
        </p>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.text}
            onChange={this.handleChange}
            placeholder="add a new task"
          />
          <p>
            {this.state.textError}
          </p>
          <select
            className="select"
            value={this.state.selectedOption}
            onChange={event => this.handleSelect(event)}
          >
            <option value={0}>
              Choose a user
            </option>
            {this.state.newUsers.map(({ id, name }) => (
              <option
                value={id}
                key={id}
              >
                {name}
              </option>
            ))}
          </select>
          <p>
            {this.state.selectError}
          </p>
          <input
            type="submit"
            value="AddTodo"
          />
        </form>

        <TodoList preparedTodos={preparedTodos} />
      </div>
    );
  }
}
