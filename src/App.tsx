import React from 'react';
import { uuid } from 'uuidv4';
import TodoList from './TodoList';
import './App.css';

import todos from './api/todos';
import users from './api/users';

interface State {
  title: string;
  userId: number;
  usersArr: Todo[];
  isValidTitle: boolean;
  isValidUser: boolean,
}

const usersTodoArray = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

class App extends React.Component<{}, State> {
  state: State = {
    title: '',
    userId: 0,
    isValidTitle: true,
    isValidUser: true,
    usersArr: [...usersTodoArray],
  };

  selectId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      isValidUser: true,
      userId: +event.target.value,
    });
  };

  addTodo = () => {
    if (this.state.userId === 0) {
      this.setState({
        isValidUser: false,
      });

      return;
    }

    if (this.state.title.length === 0) {
      this.setState({
        isValidTitle: false,
      });

      return;
    }

    this.setState((prev) => ({
      title: '',
      userId: 0,
      isValidTitle: true,
      usersArr: [...prev.usersArr, {
        userId: prev.userId,
        id: uuid(),
        title: prev.title,
        completed: false,
        user: users[prev.userId - 1],
      }],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={(event) => event.preventDefault()}>
          <select onChange={this.selectId} value={this.state.userId} className="input__select">
            <option key={0} value={0} selected disabled>Choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <div>
            {!this.state.isValidUser ? 'Please choose a user' : null}
          </div>
          <input
            type="text"
            value={this.state.title}
            placeholder="Write a title"
            className="input__title"
            onChange={(event => {
              this.setState({
                isValidTitle: true,
                title: event.target.value,
              });
            })}
          />
          <div>
            {!this.state.isValidTitle ? 'Please write a title' : null}
          </div>
          <button type="submit" onClick={this.addTodo}>Add</button>
          <TodoList usersTodoArray={this.state.usersArr} />
        </form>
      </div>
    );
  }
}

export default App;
