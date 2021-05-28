import React from 'react';
import './App.css';
import { TodoList } from './TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    stateTodos: [...preparedTodos],
    todoTitle: '',
    userName: '',

    isTodoTitle: false,
    isUser: false,
  };

  changeTodoTitle = (event) => {
    this.setState({
      todoTitle: event.target.value,
      isTodoTitle: false,
    });
  }

  handleChangeUser = (event) => {
    this.setState({
      userName: event.target.value,
      isUser: false,
    });
  }

  addTodo = (event) => {
    const { todoTitle, userName } = this.state;

    event.preventDefault();

    this.setState({
      isTodoTitle: !todoTitle,
      isUser: !userName,
    });

    if (!todoTitle) {
      return;
    }

    if (!userName) {
      return;
    }

    this.setState((state) => {
      const newTodo = {
        title: state.todoTitle,
        id: state.stateTodos.length + 1,
        completed: false,
        user: users.find(user => user.name === state.userName),
      };

      return {
        stateTodos: [...state.stateTodos, newTodo],
        todoTitle: '',
        userName: '',
        isTodoTitle: false,
        isUser: false,
      };
    });
  }

  render() {
    const { stateTodos, isTodoTitle, isUser } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form onSubmit={this.addTodo}>
          <div>
            <label htmlFor="create-todo">
              Create todo
            </label>
            <input
              type="text"
              name="todoTitle"
              id="create-todo"
              placeholder="Creat todo"
              value={this.state.todoTitle}
              onChange={this.changeTodoTitle}
            />
            {isTodoTitle && (
              <span>*Please enter todo</span>
            )}
          </div>

          <label htmlFor="select-people">
            Select people
          </label>

          <select
            name="userName"
            id="select-people"
            value={this.state.userName}
            onChange={this.handleChangeUser}
          >
            <option value=""> Choose a user</option>
            {users.map(user => (
              <option key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isUser && (
            <span>*Please choose a user</span>
          )}

          <div>
            <button type="submit">
              Add Todo
            </button>
          </div>
        </form>

        <TodoList todos={stateTodos} />
      </div>
    );
  }
}

export default App;
