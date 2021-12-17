import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import { User } from './types/User';

const preparedTodos = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

type State = {
  taskTitle: string,
  emptyTitle: boolean,
  username: string,
  emptyUsername: boolean,
  todoList: Todo[],
};

class App extends React.Component<{}, State> {
  state: State = {
    taskTitle: '',
    emptyTitle: false,
    username: '',
    emptyUsername: false,
    todoList: preparedTodos,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      taskTitle: event.target.value,
      emptyTitle: false,
    });
  };

  handleUsernameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      username: event.target.value,
      emptyUsername: false,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentUser = users.find(user => this.state.username === user.name) || null;

    if (currentUser) {
      const newTodo: Todo = this.createTodo(currentUser);

      this.setState(state => ({
        todoList: [...state.todoList, newTodo],
        taskTitle: '',
        emptyTitle: false,
        username: '',
        emptyUsername: false,
      }));
    }
  };

  createTodo = (currentUser: User) => {
    const newId = 1 + this.state.todoList.reduce((maxId, { id }) => {
      return maxId > id ? maxId : id;
    }, 0);

    const newTodo: Todo = {
      userId: currentUser.id,
      id: newId,
      title: this.state.taskTitle,
      user: currentUser,
    };

    return newTodo;
  };

  checkForm = () => {
    if (!this.state.taskTitle) {
      this.setState({ emptyTitle: true });
    }

    if (!this.state.username) {
      this.setState({ emptyUsername: true });
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form className="App__form" onSubmit={this.handleSubmit}>
          <div>
            <input
              className="App__taskTitle"
              type="text"
              placeholder="Task title"
              value={this.state.taskTitle}
              onChange={this.handleTitleChange}
              required
            />

            {this.state.emptyTitle
              && <p className="App__errorMessage">Please enter the title</p>}
          </div>

          <div>
            <select
              className="App__userSelect"
              value={this.state.username}
              onChange={this.handleUsernameChange}
              required
            >
              <option disabled={this.state.username !== ''}>
                Choose a user
              </option>
              {users.map(({ id, name }) => (
                <option key={id} value={name}>
                  {name}
                </option>
              ))}
            </select>

            {this.state.emptyUsername
              && <p className="App__errorMessage">Please choose a user</p>}
          </div>

          <button
            className="App__submitButton"
            type="submit"
            onClick={this.checkForm}
          >
            Add
          </button>

          <TodoList todoList={this.state.todoList} />
        </form>
      </div>
    );
  }
}

export default App;
