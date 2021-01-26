import React from 'react';
import './App.css';
import { TodoList } from './TodoList';
import todosFromServer from './api/todos';
import users from './api/users';

function getUserById(userId) {
  return users.find(user => user.id === userId);
}

const todosWithUsers = todosFromServer.map(todo => ({
  ...todo,
  userName: getUserById(todo.userId).name,
}));

class App extends React.Component {
  state= {
    todos: todosWithUsers,
    todoTitle: '',
    userId: 0,
    showTitleError: false,
    showUserError: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { todos, todoTitle, userId } = this.state;

    this.setState({
      showTitleError: false,
      showUserError: false,
    });

    if (!todoTitle) {
      this.setState({ showTitleError: true });

      return;
    }

    if (+userId === 0) {
      this.setState({ showUserError: true });

      return;
    }

    this.setState((state) => {
      const newTodo = {
        id: todos.length + 1,
        title: todoTitle,
        completed: false,
        userName: getUserById(+userId).name,
      };

      return ({
        todos: [...state.todos, newTodo],
        todoTitle: '',
        userId: 0,
      });
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo</h1>
        <form
          action="./api/todo.js"
          method="POST"
          onSubmit={this.handleSubmit}
        >
          <div className="mb-3">
            <label
              htmlFor="new-todo"
            >
              Todo
            </label>
            <input
              className="form-control"
              type="text"
              name="todoTitle"
              id="new-todo"
              placeholder="Please enter the task"
              value={this.state.todoTitle}
              onChange={this.handleChange}
            />
            {this.state.showTitleError
            && <p className="alert alert-warning">Please enter the title</p>}
          </div>

          <div className="form-group">
            <label htmlFor="selected-user">
              User
            </label>
            <select
              className="form-control"
              name="userId"
              id="selected-user"
              value={this.state.userId}
              onChange={this.handleChange}
            >
              <option value="0">Please choose a user</option>

              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {this.state.showUserError
            && <p className="alert alert-warning">Please choose a user</p>}
          </div>

          <button className="btn btn-info" type="submit">Add</button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
