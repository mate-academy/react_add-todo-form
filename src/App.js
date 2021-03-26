import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './Components/TodoList';

const prepairedTodos = [...todos].map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todoList: prepairedTodos,
    userId: 0,
    title: '',
    hasEmptyName: false,
    hasEmptyTitle: false,
  }

  addTodo = (event) => {
    event.preventDefault();

    if (!this.state.title && !this.state.userId) {
      return this.setState({
        hasEmptyName: true,
        hasEmptyTitle: true,
      });
    }

    if (!this.state.userId) {
      return this.setState({ hasEmptyName: true });
    }

    if (!this.state.title) {
      return this.setState({ hasEmptyTitle: true });
    }

    return this.setState((prevState) => {
      const { userId } = this.state;
      const newTodo = {
        userId: prevState.userId,
        title: prevState.todoTitle,
        id: prevState.todoList.length + 1,
        user: users.find(user => user.id === +userId),
      };

      return ({
        todoList: [...prevState.todoList, newTodo],
        userId: 0,
        title: '',
        hasEmptyName: false,
        hasEmptyTitle: false,
      });
    });
  }

  changeName = (event) => {
    const { value } = event.target;

    this.setState({
      userId: value,
      hasEmptyName: false,
    });
  }

  changeTitle = (event) => {
    const { value } = event.target;

    this.setState({
      title: value,
      hasEmptyTitle: false,
    });
  }

  render() {
    const {
      userId,
      title,
      todoList,
      hasEmptyName,
      hasEmptyTitle,
    } = this.state;

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
            <p>{hasEmptyName && 'Please choose a user'}</p>
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
            <label htmlFor="title">
              Add  title
            </label>
            <br />
            <input
              id="title"
              name="addTitle"
              type="text"
              placeholder="&#9998; Write  title"
              value={title}
              onChange={this.changeTitle}
            />
            <p>{hasEmptyTitle && 'Please enter the title'}</p>
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
