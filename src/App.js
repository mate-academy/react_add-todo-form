import React from 'react';
import './App.css';
import { TodoList } from './Components/TodoList';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    user: '',
    title: '',
    isTitle: false,
    isUserName: false,
  }

  addNewTodo = () => {
    this.setState(state => ({
      todos: [...state.todos, {
        id: Math.max(...state.todos.map(item => item.id)) + 1,
        title: state.title,
        completed: false,
        user: users.find(user => user.name === state.user),
      }],
    }));
  }

  handlerEvent = (event) => {
    const { user, title } = this.state;

    event.preventDefault();

    this.setState({
      isUserName: !user,
    });

    if (title.length === 0) {
      this.setState({
        isTitle: true,
      });

      return;
    }

    if (!user) {
      return;
    }

    this.addNewTodo();
    this.setState({
      user: '',
      title: '',
    });
  }

  render() {
    const {
      // eslint-disable-next-line
      todos,
      isTitle,
      isUserName,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {todos.length}
        </p>
        <form
          className="form"
          onSubmit={this.handlerEvent}
        >
          <label
            htmlFor="title"
          >
            Title
          </label>
          <input
            value={this.state.title}
            id="title"
            onChange={(event) => {
              this.setState({
                title: event.target.value,
                isTitle: false,
              });
            }}
          />
          {isTitle && (
            <span className="red">
              Please enter the title
            </span>
          )}
          <label
            htmlFor="users"
          >
            User
          </label>
          <select
            id="users"
            value={this.state.user}
            onChange={(event) => {
              this.setState({
                user: event.target.value,
                isUserName: false,
              });
            }}
          >
            <option
              disabled
              value=""
            >
              Select a user
            </option>
            {users.map(({ id, name }) => (
              <option key={id} value={name}>
                {name}
              </option>
            ))}
          </select>
          {isUserName && (
            <span className="red">
              Please choose a user
            </span>
          )}
          <button
            type="submit"
          >
            add
          </button>
        </form>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
