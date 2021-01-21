import React from 'react';
import './App.scss';
import TodoList from './components/TodoList';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos
  .map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));

class App extends React.Component {
  state = {
    todoList: preparedTodos,
    todoName: '',
    userId: 0,
    error: false,
    errMes: '',
  }

  showError = () => {
    this.setState({ error: true });
  }

  handleError = () => {
    if (!this.state.todoName) {
      this.setState({ errMes: 'Input the task! ' });
    }

    if (!this.state.userId) {
      this.setState({
        errMes: 'Select the user!',
      });
    }
  }

  addTodo = (event) => {
    event.preventDefault();
    if (!this.state.todoName || !this.state.userId) {
      this.handleError();

      this.showError();
      setTimeout(() => (
        this.setState({ error: false })
      ), 2000);

      return;
    }

    this.setState((state) => {
      const newTodo = {
        title: state.todoName,
        id: Math.trunc(Math.random() * 1000),
        userId: state.userId,
        user: users.find(user => user.id === state.userId),
      };

      return ({
        todoList: [...state.todoList, newTodo],
        todoName: '',
        userId: 0,
        error: false,
        errMes: '',
      });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="todo__top">
          <h1 className="1">ToDo</h1>
        </div>
        <main className="todo__content">
          <div className="todo__sidebar">
            <div className="todo__info">
              <span>
                Tasks:&nbsp;
                {this.state.todoList.length}
              </span>
              <br />
              <span>
                Users:&nbsp;
                {users.length}
              </span>
            </div>
            <div className="add_todo">
              <h3>Add new task</h3>
              <form
                action="#"
                method="POST"
                onSubmit={this.addTodo}
              >
                <div className="form-field">
                  <label htmlFor="select-user">User&nbsp;</label>
                  <br />
                  <select
                    name="user"
                    id="select-user"
                    className="select-field"
                    value={this.state.userId}
                    onChange={(event) => {
                      this.setState({ userId: +event.target.value });
                    }}
                  >
                    <option value="0">
                      Select User
                    </option>
                    {
                      users.map(user => (
                        <option
                          value={user.id}
                          key={user.id}
                        >
                          {user.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="new-todo-name">New task&nbsp;</label>
                  <br />
                  <input
                    id="new-todo-name"
                    type="text"
                    name="todoName"
                    className="input-text"
                    placeholder="Enter the task"
                    value={this.state.todoName}
                    onChange={(event) => {
                      this.setState({ todoName: event.target.value });
                    }}
                  />
                  <br />
                </div>
                <button
                  type="button"
                  onClick={this.addTodo}
                  className="btn"
                >
                  Add
                </button>
              </form>
              <p className="notification">
                {this.state.error && <p className="err">{this.state.errMes}</p>}
              </p>
            </div>
          </div>
          <TodoList todos={this.state.todoList} />
        </main>
      </div>
    );
  }
}

export default App;
