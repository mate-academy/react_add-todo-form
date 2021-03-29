import React from 'react';

import todos from './api/todos';
import users from './api/users';

import { TodoList } from './components/ToDoList/ToDoList';

import './App.scss';

const preparedTodos = [...todos].map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state={
    toDoList: preparedTodos,
    userId: 0,
    toDoTitle: '',
    errorName: false,
    errorTitle: false,
    completed: false,
  }

  addTodo = (event) => {
    event.preventDefault();

    if (!this.state.userId) {
      return this.setState({ errorName: true });
    }

    if (!this.state.toDoTitle) {
      return this.setState({ errorTitle: true });
    }

    return (
      this.setState((currentState) => {
        const newToDo = {
          userId: currentState.userId,
          id: currentState.toDoList.length + 1,
          title: currentState.toDoTitle,
          completed: currentState.completed,
          user: users.find(user => user.id === +this.state.userId),
        };

        return ({
          toDoList: [...currentState.toDoList, newToDo],
          userId: 0,
          toDoTitle: '',
          errorName: false,
          errorTitle: false,
          completed: false,
        });
      })
    );
  }

  changeName = (event) => {
    const { value } = event.target;

    this.setState({
      userId: value,
      errorName: false,
    });
  }

  changeTitle = (event) => {
    const { value } = event.target;

    this.setState({ toDoTitle: value });
  }

  render() {
    const { toDoList, userId, errorTitle, toDoTitle, errorName } = this.state;

    return (
      <div className="App">
        <h1 className="App__header">List of todos</h1>
        <p>
          <span className="App__info">Todos: </span>
          {toDoList.length}
        </p>

        <p>
          <span className="App__info">Users: </span>
          {users.length}
        </p>

        {errorName && <p className="error">Choose a user</p>}

        <form onSubmit={this.addTodo}>
          <span>Choose user </span>
          <select
            name="user"
            value={userId}
            onChange={this.changeName}
          >
            <option value="">
              Choose a user
            </option>
            {
              users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))
            }
          </select>

          {errorTitle && <p className="error">Please enter the title</p>}

          <label htmlFor="title">
            {` Choose title `}
          </label>
          <input
            type="text"
            id="title"
            placeholder={errorTitle && 'Enter the title here'}
            value={toDoTitle}
            onChange={this.changeTitle}
          />

          <button
            type="submit"
          >
            Add
          </button>
        </form>

        <TodoList todos={toDoList} />
      </div>
    );
  }
}

export default App;
