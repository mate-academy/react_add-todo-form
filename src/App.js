import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';

const preparedTodos = todos.map(
  todo => Object.assign(
    todo, { user: users.find(user => user.id === todo.userId) },
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

    if (this.state.todo.trim() === '') {
      this.setState({ showWriteTodoError: true });

      return;
    }

    this.setState({ showWriteTodoError: false });

    if (authorOfTodo === undefined) {
      this.setState({ showChooseUserError: true });

      return;
    }

    this.setState({ showChooseUserError: false });

    this.setState(state => ({
      todosList: [...state.todosList, {
        completed: false,
        user: authorOfTodo,
        id: Date.now(),
        userId: authorOfTodo.id,
        title: state.todo,
      }],
      todo: '',
      userId: 0,
      showChooseUserError: false,
      showWriteTodoError: false,
    }));
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  changeStatusHandler = (id) => {
    this.setState(state => ({
      todosList: state.todosList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
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
