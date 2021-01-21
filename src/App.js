import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';

function getuserByID(userId) {
  return users.find(user => user.id === userId);
}

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: getuserByID(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    title: '',
    userId: 0,
    completed: false,
    inputAlert: false,
    selectAlert: false,
  }

  render() {
    const dataChecking = () => {
      if (this.state.title.length === 0) {
        this.setState({ inputAlert: true });

        return;
      }

      if (this.state.userId === 0) {
        this.setState({ selectAlert: true });

        return;
      }

      this.setState((state) => {
        const newTodo = {
          id: 1 + Math.random(),
          title: state.title,
          userId: state.userId,
          completed: state.completed,
          user: getuserByID(state.userId),
        };

        return ({
          todos:
          [...state.todos, newTodo],
          title: '',
          userId: 0,
        });
      });
    };

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <form
          onSubmit={(event) => {
            event.preventDefault();

            dataChecking();
          }}
        >
          <div className="form__field">
            <label htmlFor="newTodo" className="text__input">
              New todo:
            </label>

            {this.state.inputAlert
              && <span className="input__alert">Please enter the title</span>}

            <input
              type="text"
              name="todo"
              value={this.state.title}
              onChange={(event) => {
                this.setState({
                  title: event.target.value.trim(),
                  inputAlert: false,
                });
              }}
              id="newTodo"
              placeholder="Write your todo hear"
            />

            {this.state.selectAlert
              && <span className="select__alert">Please select the user</span>}

            <select
              name="userId"
              value={this.state.userId}
              onChange={(event) => {
                this.setState({
                  userId: Number(event.target.value),
                  selectAlert: false,
                });
              }}
            >
              <option>Please choose a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>

            <button type="submit">
              Add
            </button>
          </div>

        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
