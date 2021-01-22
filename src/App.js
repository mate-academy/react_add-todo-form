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

  dataChecking = (event) => {
    event.preventDefault();

    const { title, userId } = this.state;

    if (!title || !userId) {
      this.setState(state => ({
        inputAlert: !state.title,
        selectAlert: !state.userId,
      }));

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
        todos: [
          ...state.todos,
          newTodo],
        title: '',
        userId: 0,
      });
    });
  };

  selectingUserId = (event) => {
    this.setState({
      userId: Number(event.target.value),
      selectAlert: false,
    });
  }

  updatingTitle = (event) => {
    this.setState({
      title: event.target.value.replace(/[^ a-zA-Z0-9]/g, ''),
      inputAlert: false,
    });
  }

  render() {
    const { title, userId, inputAlert, selectAlert } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <form onSubmit={this.dataChecking}>
          <div className="form__field">
            <label htmlFor="newTodo" className="text__input">
              New todo:
            </label>

            <input
              type="text"
              name="todo"
              value={title.replace(/\s{2,}/g, ' ')}
              onChange={this.updatingTitle}
              id="newTodo"
              placeholder="Write your todo hear"
            />

            {inputAlert
              && <span className="input__alert">Please enter the title</span>}

            <select
              name="userId"
              value={userId || 0}
              onChange={this.selectingUserId}
            >
              <option>Please choose a user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>

            {selectAlert
              && <span className="select__alert">Please select the user</span>}

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
