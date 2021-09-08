import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { Todolist } from './Component/Todolist';
import TodoType from './Types/Type';

type State = {
  todos: TodoType[];
  userId: number;
  noTitleEntered: boolean;
  noUserSelected: boolean;
  title: string;
};

class App extends React.Component<{}, State> {
  state:State = {
    todos: todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    })),
    userId: 0,
    noTitleEntered: false,
    noUserSelected: false,
    title: '',
  };

  addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (this.state.title.length === 0) {
      this.setState({ noTitleEntered: true });

      return;
    }

    if (this.state.userId === 0) {
      this.setState({ noUserSelected: true });

      return;
    }

    this.setState((prevState) => ({
      todos: [...prevState.todos, {
        userId: prevState.userId,
        id: Math.max(...prevState.todos.map(todo => todo.id)) + 1,
        title: prevState.title,
        completed: false,
        user: users.find(userToFind => userToFind.id === prevState.userId),
      }],
      // noTitleEntered: prevState.title.length === 0,
    }));
    this.setState({
      userId: 0,
      title: '',
    });
  };

  handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({
    title: event.target.value,
    noTitleEntered: false,
  });

  handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => this.setState({
    userId: +event.target.value,
    noUserSelected: false,
  });

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <form onSubmit={this.addTodo}>
          <div>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleTitle}
              placeholder="title"
            />
            <span
              hidden={!this.state.noTitleEntered}
              style={{ color: 'red' }}
            >
              Please enter the title
            </span>
          </div>
          <div>
            <select
              name="user"
              value={this.state.userId}
              onChange={this.handleSelect}
            >
              <option value="0">
                Choose a user
              </option>
              {users.map(user => (
                <option value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <span
              hidden={!this.state.noUserSelected}
              style={{ color: 'red' }}
            >
              Please choose a user
            </span>
          </div>
          <button type="submit">Add</button>
        </form>
        <Todolist todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
