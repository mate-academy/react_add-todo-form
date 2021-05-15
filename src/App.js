import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';

const preparedTodos = todos.map(
  todo => Object.assign(
    todo, { user: users.filter(user => user.id === todo.userId)[0] },
  ),
);

class App extends React.Component {
  state = {
    todo: '',
    todosList: [...preparedTodos],
    userId: 0,
    showChooseUserError: false,
    showWriteTodoError: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const authorOfTodo
      = users.find(user => user.id === parseInt(this.state.userId, 10));
    const newTodoId
      = Math.max(...this.state.todosList.map(todo => todo.id)) + 1;

    if (this.state.todo === '') {
      this.setState({ showWriteTodoError: true });

      return;
    }

    this.setState({ showWriteTodoError: false });

    if (authorOfTodo === undefined) {
      this.setState({ showChooseUserError: true });

      return;
    }

    this.setState({ showChooseUserError: false });

    this.setState((state) => {
      const copyOfTodoList = [...state.todosList];

      copyOfTodoList.push({
        completed: false,
        user: authorOfTodo,
        id: newTodoId,
        userId: authorOfTodo.id,
        title: state.todo,
      });

      return {
        todosList: copyOfTodoList,
        todo: '',
        userId: 0,
        showChooseUserError: false,
        showWriteTodoError: false,
      };
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  changeStatusHandler = (id) => {
    const changedTodo = this.state.todosList.find(todo => todo.id === id);

    changedTodo.completed = !changedTodo.completed;
    this.forceUpdate();
  }

  render() {
    return (
      <div className="App">
        <h1>Todos:</h1>
        <TodoList
          todos={this.state.todosList}
          changeStatusHandler={this.changeStatusHandler}
        />
        <form onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Write your todo here"
            value={this.state.todo}
            onChange={this.handleChange}
            name="todo"
          />

          <div>
            <select
              value={this.state.userId}
              onChange={this.handleChange}
              name="userId"
            >
              <option value="">
                Choose username
              </option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
            <button type="submit">
              Add
            </button>
          </div>
          <div className="errors">
            {this.state.showChooseUserError && (
              <div className="error-msg">
                <h1>Please, choose user</h1>
              </div>
            )}
            {this.state.showWriteTodoError && (
              <div className="error-msg">
                <h1>Please, write todo</h1>
              </div>
            )}
          </div>
        </form>
      </div>
    );
  }
}

export default App;
