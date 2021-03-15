import React from 'react';
import { TodoList } from './component/TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const todoFromServer = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

function findUserById(id) {
  return users.find(user => user.id === id);
}

export class App extends React.Component {
  state = {
    todos: todoFromServer,
    selectedUserId: 0,
    title: '',
    isTitleWritten: false,
    isUserWritten: false,
  }

  changeTitleHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      isTitleWritten: false,
    });
  }

  selectUserHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: +value,
      isUserWritten: false,
    });
  }

  addToList = (event) => {
    const { title, selectedUserId, isTitleWritten, isUserWritten } = this.state;

    event.preventDefault();

    if (!title || selectedUserId === 0) {
      this.setState({
        isTitleWritten: !isTitleWritten,
        isUserWritten: isUserWritten !== 0,
      });

      return;
    }

    this.setState((state) => {
      const newTodo = {
        id: state.todos.length + 1,
        title,
        completed: false,
        userId: selectedUserId,
        user: findUserById(selectedUserId),
      };

      return ({
        selectedUserId: 0,
        title: '',
        todos: [...state.todos, newTodo],
      });
    });
  };

  render() {
    const {
      isTitleWritten,
      isUserWritten,
      selectedUserId,
      title,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form method="GET">
          <label>
            <input
              type="text"
              name="title"
              placeholder="Please enter the title"
              value={title}
              onChange={this.changeTitleHandler}
            />
          </label>
          <label>
            <select
              name="selectedUserId"
              onChange={this.selectUserHandler}
              value={selectedUserId}
            >
              <option>Choose a user</option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            onClick={this.addToList}
          >
            Add
          </button>
        </form>
        <TodoList todos={this.state.todos} />
        {isTitleWritten && (
          <div className="isTitleWritten">Dude, write some title</div>
        )}
        {isUserWritten && (
          <div className="isUserWritten">Mate, u didnt choose user</div>
        )}
      </div>
    );
  }
}

export default App;
