import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList/TodoList';
import todos from './api/todos';
import users from './api/users';

type State = {
  todos: Todo[];
  title: string;
  name: string;
  chooseUser: string;
  writeTitle: string;
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...todos],
    title: '',
    name: '',
    chooseUser: '',
    writeTitle: '',
  };

  addNewTodo = () => {
    if (!this.state.title) {
      this.setState({
        writeTitle: 'Please enter the title',
      });
    }

    if (!users.some(user => this.state.name === user.name)) {
      this.setState({
        chooseUser: 'Please choose a user',
      });
    }

    if (
      users.some(user => this.state.name === user.name)
      && this.state.title
    ) {
      this.setState((currentState) => {
        const newId = currentState.todos[currentState.todos.length - 1].id + 1;
        const newTitle = currentState.title;
        const userIndex = users.findIndex((user) => user.name === currentState.name);
        const newTodo = {
          id: newId,
          title: newTitle,
          userId: users[userIndex].id,
        };

        return {
          todos: [...currentState.todos, newTodo],
          title: '',
          writeTitle: '',
          chooseUser: '',
        };
      });
    }
  };

  render() {
    return (
      <div className="app">
        <h1>Add todo form</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            this.addNewTodo();
          }}
        >
          <div className="input">
            <select
              name="users"
              value={this.state.name}
              className="form-control form-control-sm"
              onChange={(event) => this.setState({
                name: event.target.value,
                chooseUser: '',
              })}
            >
              <option>Choose a user</option>
              {users.map(user => {
                return (
                  <option>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="errors">
            {this.state.chooseUser
              && this.state.chooseUser}
          </div>
          <div className="input">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Add ToDo"
              value={this.state.title}
              onChange={(event) => {
                this.setState({
                  title: event.target.value,
                  writeTitle: '',
                });
              }}
            />
          </div>
          <div className="errors">
            {this.state.writeTitle
              && this.state.writeTitle}
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Add
            </button>
          </div>
        </form>
        <p>
          <TodoList todos={this.state.todos} />
        </p>
      </div>
    );
  }
}

export default App;
