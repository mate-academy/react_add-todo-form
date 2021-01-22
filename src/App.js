import React from 'react';
import './App.scss';
import TodoList from './components/TodoList';

import todos from './api/todos';
import users from './api/users';

const getUserById = userId => users.find(user => user.id === userId);
const preparedTodos = todos
  .map(todo => ({
    ...todo,
    user: getUserById(todo.userId).name,
  }));
const symbols = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;

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
    if (!this.state.todoName.match(symbols)) {
      this.setState({
        errMes: 'Invalid symbols!',
        todoName: '',
      });
    }

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
    // eslint-disable-next-line max-len
    if (!this.state.todoName || !this.state.userId || !this.state.todoName.match(symbols)) {
      this.handleError();

      this.showError();
      setTimeout(() => (
        this.setState({ error: false })
      ), 2000);

      return;
    }

    this.setState((state) => {
      const { userId, todoList } = this.state;
      const lastId = todoList[todoList.length - 1].id;

      const newTodo = {
        title: state.todoName,
        id: lastId + 1,
        userId: state.userId,
        user: getUserById(userId).name,
      };

      return ({
        todoList: [...state.todoList, newTodo],
        todoName: '',
        userId: 0,
        error: false,
      });
    });
  }

  handleNameChange = (event) => {
    this.setState({ userId: +event.target.value });
  }

  handleTaskChange = (event) => {
    this.setState({ todoName: event.target.value });
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
                    onChange={this.handleNameChange}
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
                    onChange={this.handleTaskChange}
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
              <p className="err">
                {this.state.error && this.state.errMes}
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
