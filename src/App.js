import React from 'react';
import './App.css';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoList } from './components/TodoList';

const preparedTodos = todosFromServer.map(todo => (
  {
    ...todo,
    name: (usersFromServer.find(user => user.id === todo.userId)).name,
  }
));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    todo: '',
    user: '',
    userError: '',
    titleError: '',
  };

  handleChanges = (event) => {
    this.setState({
      todo: event.target.value,
      titleError: '',
    });
  }

  handleSelect = (event) => {
    this.setState({
      user: event.target.value,
      userError: '',
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { todo, todos, user } = this.state;

    if (!todo) {
      this.setState({ titleError: 'Please enter todo' });
    }

    if (!user) {
      this.setState({ userError: 'Please select user' });
    }

    if (todo && user) {
      this.setState(state => ({
        todos: [
          ...state.todos,
          {
            name: user,
            title: todo,
            userId: usersFromServer.find(usr => usr.name === user).id,
            completed: false,
            id: todos.length + 1,
          },
        ],
        todo: '',
        user: '',
      }));
    }
  }

  render() {
    const { todo, todos, titleError, userError, user } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {usersFromServer.length}
        </p>

        <form
          className="add__form"
          onSubmit={event => this.handleSubmit(event)}
        >
          <select
            name="selectUser"
            className="add__item"
            value={user}
            onChange={this.handleSelect}
          >
            <option>Choose a user</option>
            {usersFromServer.map(usr => (
              <option key={usr.id} value={usr.name}>
                {usr.name}
              </option>
            ))}
          </select>

          <div className="error">{userError}</div>

          <input
            type="text"
            name="todo"
            className="add__item"
            value={todo}
            onChange={this.handleChanges}
            placeholder="Add Todo"
          />

          <div className="error">{titleError}</div>

          <button
            type="submit"
            className="add__item add__button"
          >
            Add
          </button>
        </form>

        <div className="todo-list">
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}

export default App;
