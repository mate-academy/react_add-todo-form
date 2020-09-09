import React from 'react';
import './App.css';

import { Users } from './components/Users';
import { Todos } from './components/Todos';
import todos from './api/todos';

export class App extends React.Component {
  state = {
    todoList: [...todos],
    userId: '',
    title: '',
    error: '',
  }

  submit = (event) => {
    event.preventDefault();

    const { todoList, userId, title } = this.state;
    const id = todoList.length + 1;
    const newTodo = {
      userId,
      id,
      title,
      completed: false,
    };

    this.setState({ error: '' });

    if (!userId) {
      this.setState({
        error: 'Please choose a user',
      });
    } else if (!title) {
      this.setState({
        error: 'Please enter the title',
      });
    } else {
      this.setState(state => ({
        todoList: [...todoList, newTodo],
        title: '',
      }));
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          className="form"
          onSubmit={this.submit}
        >
          <select
            name="name"
            className="item"
            value={this.state.userId}
            onChange={(event) => {
              this.setState({
                userId: event.target.value,
              });
            }}
          >
            <Users />
          </select>
          <textarea
            className="item"
            value={this.state.title}
            rows="5"
            placeholder="Type here new TODO"
            onChange={(event) => {
              this.setState({
                title: event.target.value,
              });
            }}
          />
          <button type="submit">
            ADD
          </button>
          <p className="error">{this.state.error}</p>
        </form>
        <div className="list">
          <Todos todos={this.state.todoList} />
        </div>
      </div>
    );
  }
}
