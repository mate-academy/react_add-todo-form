import React from 'react';
import './App.scss';

import TodoList from './components/TodoList/TodoList';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    preparedTodos,
    titleEntered: true,
    nameChoosed: true,
    titleInput: '',
    selectInput: '',
  }

  addTodo = (event) => {
    const { selectInput: userId, titleInput: title } = this.state;

    if (userId !== 0 && title !== '') {
      const todo = {
        id: this.state.preparedTodos.length + 1,
        userId,
        title,
        user: users.find(user => user.id === userId),
      };

      this.setState(
        state => ({
          preparedTodos: [...state.preparedTodos, todo],
          titleEntered: true,
          nameChoosed: true,
          titleInput: '',
          selectInput: '',
        }),
      );
      event.target.reset();
    }

    this.setState({
      titleEntered: Boolean(title),
      nameChoosed: Boolean(userId),
    });

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
      selectInput: Number(event.target.value),
    });
  }

  render() {
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
            {!this.state.titleEntered
              && <span>Please enter a title</span>}
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
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!this.state.nameChoosed
            && <span className="UserValidation">Please choose name</span>}

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
            <TodoList preparedTodos={this.state.preparedTodos} />
          </span>

        </div>

      </div>
    );
  }
}

export default App;
