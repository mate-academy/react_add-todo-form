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
    todoTitle: '',
    showErrorMessageOfName: false,
    ShowErrorMessageOfTitle: false,
  }

  addTodo = (event) => {
    event.preventDefault();

    if (!this.state.userId) {
      return this.setState({ showErrorMessageOfName: true });
    }

    if (!this.state.todoTitle) {
      return this.setState({ ShowErrorMessageOfTitle: true });
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
        showErrorMessageOfName: false,
        ShowErrorMessageOfTitle: false,
      });
    });
  }

  changeName = (event) => {
    const { value } = event.target;

    this.setState({
      userId: value,
      showErrorMessageOfName: false,
    });
  }

  changeTitle = (event) => {
    const { value } = event.target;

    this.setState({
      todoTitle: value,
      ShowErrorMessageOfTitle: false,
    });
  }

  render() {
    const {
      userId,
      todoTitle,
      todoList,
      showErrorMessageOfName,
      ShowErrorMessageOfTitle,
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
            <p>{showErrorMessageOfName && 'Please choose a user'}</p>
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
              value={todoTitle}
              onChange={this.changeTitle}
            />
            <p>{ShowErrorMessageOfTitle && 'Please enter the title'}</p>
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
