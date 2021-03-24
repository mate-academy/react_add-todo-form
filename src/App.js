import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './Components/TodoList';

const prepairedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todoList: prepairedTodos,
    userId: 0,
    todoTitle: '',
    errorMessageOfName: false,
    errorMessageOfTitle: false,
  }

  addTodo = (event) => {
    event.preventDefault();

    if (!this.state.userId) {
      return this.setState({ errorMessageOfName: true });
    }

    if (!this.state.todoTitle) {
      return this.setState({ errorMessageOfTitle: true });
    }

    return this.setState((prevState) => {
      const { userId } = this.state;
      const prepearedTodoForPush = {
        userId: prevState.userId,
        title: prevState.todoTitle,
        id: prevState.todoList.length + 1,
        user: users.find(user => user.id === +userId),
      };

      return ({
        todoList: [...prevState.todoList, prepearedTodoForPush],
        userId: 0,
        todoTitle: '',
        errorMessageOfName: false,
        errorMessageOfTitle: false,
      });
    });
  }

  changeName = (event) => {
    const { value } = event.target;

    this.setState({ userId: value });
  }

  changeTitle = (event) => {
    const { value } = event.target;

    this.setState({ todoTitle: value });
  }

  render() {
    const { todoTitle, userId } = this.state;
    const { todoList, errorMessageOfName, errorMessageOfTitle } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <p>
          <span>Todos: </span>
          {todoList.length}
        </p>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <form
          method="post"
          action="#"
          onSubmit={this.addTodo}
        >
          <div>
            <p>{errorMessageOfName && 'Please choose a user'}</p>
            <select
              value={userId}
              name="chooseUser"
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
          </div>
          <div>
            <lable>
              <input
                name="addTitle"
                type="text"
                value={todoTitle}
                onChange={this.changeTitle}
              />
            </lable>
            <p>{errorMessageOfTitle && 'Please enter the title'}</p>
            <button
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
        <TodoList todos={this.state.todoList} />
      </div>
    );
  }
}

export default App;
