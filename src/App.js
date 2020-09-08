import React from 'react';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const prepearedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: [...prepearedTodos],
    todoId: todosFromServer.length + 1,
    titleErrorMessage: '',
    userErrorMessage: '',
  }

  submitHandler = (event) => {
    event.preventDefault();

    const form = event.target;
    const title = form.todoTitle.value;
    const userId = form.todoUser.value;

    if (!title) {
      this.setState({
        titleErrorMessage: 'Please enter the title',
      });
    }

    if (!userId) {
      this.setState({
        userErrorMessage: 'Please choose a user',
      });
    }

    if (!title || !userId) {
      return;
    }

    const newTodo = {
      userId,
      id: this.state.todoId,
      title,
      completed: false,
      user: usersFromServer.find(user => user.id === +userId),
    };

    form.reset();

    this.setState((state) => {
      const { todos, todoId } = state;

      return {
        todos: [...todos, newTodo],
        todoId: todoId + 1,
      };
    });
  }

  inputHandler = (event) => {
    const title = event.target.value;

    if (title) {
      this.setState({
        titleErrorMessage: '',
      });
    } else {
      this.setState({
        titleErrorMessage: 'Please enter the title',
      });
    }
  }

  selectHandler = (event) => {
    const userId = event.target.value;

    if (userId) {
      this.setState({
        userErrorMessage: '',
      });
    } else {
      this.setState({
        userErrorMessage: 'Please choose a user',
      });
    }
  }

  render() {
    const { todos, userErrorMessage, titleErrorMessage } = this.state;

    return (
      <div className="App">
        <form onSubmit={this.submitHandler} className="form">
          <div className="form-group">
            <label htmlFor="todoTitle">New task</label>
            <input
              type="text"
              id="todoTitle"
              className="todo-input"
              placeholder="Add a new task"
              onChange={this.inputHandler}
            />
            <span className="error-message">
              {titleErrorMessage}
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="todoUser">User</label>
            <select
              id="todoUser"
              className="user-select"
              onChange={this.selectHandler}
            >
              <option value="">Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            <span className="error-message">
              {userErrorMessage}
            </span>
          </div>
          <div className="form-group">
            <button type="submit">Add Todo</button>
          </div>
        </form>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
