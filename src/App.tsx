import React from 'react';
import './App.css';
import { TodoList, Todo } from './components/TodoList';
import todos from './api/todos';
import users from './api/users';

type State = {
  todos: Todo[];
  todoTitle: string;
  userName: string;
  userError: string;
  titleError: string;
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...todos],
    todoTitle: '',
    userName: '',
    userError: '',
    titleError: '',
  };

  addNewTodo = () => {
    if (!this.state.todoTitle) {
      this.setState({
        titleError: 'Please enter the title',
      });
    }

    if (!users.some(user => this.state.userName === user.name)) {
      this.setState({
        userError: 'Please choose a user',
      });
    }

    if (
      users.some(user => this.state.userName === user.name)
      && this.state.todoTitle
    ) {
      this.setState((currentState) => {
        const newId = currentState.todos[currentState.todos.length - 1].id + 1;
        const newTitle = currentState.todoTitle;
        const userIndex = users.findIndex((user) => user.name === currentState.userName);
        const newTodo = {
          id: newId,
          title: newTitle,
          userId: users[userIndex].id,
        };

        return {
          todos: [...currentState.todos, newTodo],
          todoTitle: '',
          titleError: '',
          userError: '',
        };
      });
    }
  };

  render() {
    return (
      <div className="app">
        <h1>Add todo form</h1>
        <form
          className="form-horizontal"
          onSubmit={(event) => {
            event.preventDefault();
            this.addNewTodo();
          }}
        >
          <div className="input">
            <select
              name="users"
              className="form-control"
              value={this.state.userName}
              onChange={(event) => this.setState({
                userName: event.target.value,
                userError: '',
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
            {this.state.userError
               && this.state.userError}
          </div>
          <div className="input">
            <label htmlFor="input_todos">
              <input
                type="text"
                id="input_todos"
                placeholder="Add TODO"
                className="form-control"
                value={this.state.todoTitle}
                onChange={(event) => {
                  this.setState({
                    todoTitle: event.target.value,
                    titleError: '',
                  });
                }}
              />
            </label>
          </div>
          <div className="errors">
            {this.state.titleError
              && this.state.titleError}
          </div>
          <div>
            <button
              type="submit"
              className="btn"
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
