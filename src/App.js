import React, { Component } from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { getTodosWithUsers } from './getTodos';
import { Header } from './components/Header/Header';
import { TodoForm } from './components/TodoForm/TodoForm';

export class App extends Component {
  state = {
    todosFromServer: [...todos],
    usersFromServer: [...users],
    text: '',
    selectedOption: 0,
    textError: null,
    selectError: null,
  }

  handleChange = ({ target }) => {
    const { text } = this.state;
    if (text.length < 0 || text[0] === ' ') {
      this.setState({
        textError: 'Please write a task',
      });
    } else {
      this.setState({
        textError: '',
      });
    }
    this.setState({
      text: target.value.trimStart(),
    });
  }

  handleSelect = ({ target }) => {
    if (target.value < 1) {
      this.setState({
        selectError: 'Error! Please select a user',
      });
    }

    this.setState({
      selectedOption: target.value,
      selectError: '',
    });
  }

  handleHandle = (ava) => {
    this.setState(prevState => ({
      todosFromServer: [...prevState.todosFromServer, ava],
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { text, selectedOption, todosFromServer } = this.state;

    if (selectedOption < 1 || text.length < 1) {
      this.setState({
        selectError: selectedOption < 1 ? 'Please select User' : '',
        textError: text.length < 1 ? 'Please enter what needs Todo' : '',
      });
    } else {
      const newTodo = {
        userId: Number(selectedOption),
        id: todosFromServer.length + 1,
        title: text,
        completed: false,
      };

      this.setState(prevState => ({
        todosFromServer: [...prevState.todosFromServer, newTodo],
        text: '',
        selectedOption: 0,
        textError: '',
        selectError: '',
      }));
    }
  }

  render() {
    const preparedTodos = getTodosWithUsers(
      this.state.todosFromServer, this.state.usersFromServer
    );

    return (
      <div className="App">
        <Header
          className="Header"
          todoArr={this.state.todosFromServer}
        />

        <TodoForm
          users={this.state.usersFromServer}
          todos={this.state.todosFromServer}
          addNewTodo={this.handleHandle}
        />

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
            {this.state.usersFromServer.map(({ id, name }) => (
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
