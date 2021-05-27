import React from 'react';
import './App.scss';

import TodoList from './components/TodoList/TodoList';

import todos from './api/todos';
import users from './api/users';

class App extends React.Component {
  state = {
    todos,
    users,
    titleEntered: true,
    nameChoosed: true,
    titleInput: '',
    selectInput: '',
  }

  addTodo = (event) => {
    const userId = this.state.selectInput;
    const title = this.state.titleInput;

    if (userId !== '' && title !== '') {
      const todo = {
        id: this.state.todos.length + 1,
        userId: Number(userId),
        title,
      };

      this.setState(
        state => ({
          todos: [...state.todos, todo],
          titleEntered: true,
          nameChoosed: true,
        }),
      );
      event.target.reset();
    }

    if (title) {
      this.setState({ titleEntered: true });
    } else {
      this.setState({ titleEntered: false });
    }

    if (userId) {
      this.setState({ nameChoosed: true });
    } else {
      this.setState({ nameChoosed: false });
    }

    event.preventDefault();
  }

  inputHandler = (event) => {
    this.setState({
      titleEntered: true,
      titleInput: event.target.value,
    });
  }

  selectHandler = (event) => {
    this.setState({
      nameChoosed: true,
      selectInput: event.target.value,
    });
  }

  render() {
    const preparedTodos = this.state.todos.map(todo => ({
      ...todo,
      user: this.state.users.find(user => user.id === todo.userId),
    }));

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form action="/" onSubmit={this.addTodo} className="TodoForm">
          <label htmlFor="titleInput" className="TitleInput">
            <span>TODO&apos;s title</span>
            <input
              name="title"
              type="text"
              id="titleInput"
              maxLength="10"
              onChange={this.inputHandler}
            />
          </label>

          <p className="TitleValidation">
            {this.state.titleEntered
              || <span>Please enter a title</span>}
            {this.state.titleInput.length >= 10
              && (
              <span>
                You are reach the maximum length
              </span>
              )}
          </p>

          <select
            name="user"
            className="SelectUser"
            onChange={this.selectHandler}
          >
            <option value="">Choose user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {this.state.nameChoosed
            || <span className="UserValidation">Please choose name</span>}

          <button type="submit" className="TodoAddButton">Add TODO</button>
        </form>

        <p>
          <span>Todos: </span>
          {todos.length}
          <br />
          <span>Users: </span>
          {users.length}
        </p>

        <div>
          <span>
            Todos:
            <TodoList preparedTodos={preparedTodos} />
          </span>

        </div>

      </div>
    );
  }
}

export default App;
