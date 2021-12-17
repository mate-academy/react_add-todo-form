import React from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

const preperedTodos = todosFromServer.map((todo) => ({
  ...todo,
  user: usersFromServer.find(person => todo.userId === person.id) || null,
}));

type State = {
  todos: Todo[],
  taskTitle: string,
  taskUser: number,
  error: string,
};

class App extends React.Component<{}, State> {
  state = {
    todos: preperedTodos,
    taskTitle: '',
    taskUser: 0,
    error: '',
  };

  clearForm = () => {
    this.setState({ taskTitle: '', taskUser: 0 });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!this.state.taskTitle) {
      this.setState({ error: 'Enter the title' });

      return;
    }

    if (!this.state.taskUser) {
      this.setState({ error: 'Choose user' });

      return;
    }

    this.setState(state => {
      const updatedTodos = [...state.todos];
      const findUser = usersFromServer.find(person => state.taskUser === person.id) || null;

      if (findUser) {
        updatedTodos.push({
          userId: findUser.id,
          id: state.todos.length + 1,
          title: state.taskTitle,
          completed: false,
          user: findUser,
        });
      }

      return { todos: updatedTodos };
    });

    this.clearForm();
  };

  handleChangeTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ taskTitle: value, error: '' });
  };

  handleChangeUser = (event: React.ChangeEvent <HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({ taskUser: Number(value), error: '' });
  };

  render() {
    return (
      <div className="App">
        <div className="App__content">
          <h1 className="App__title">Add todo form</h1>

          <TodoList todos={this.state.todos} />

          <form
            className="form"
            onSubmit={this.handleSubmit}
          >
            <input
              type="text"
              name="taskTitle"
              placeholder="Task title"
              className="form__input"
              value={this.state.taskTitle}
              onChange={this.handleChangeTask}
            />

            <select
              value={this.state.taskUser}
              className="form__input"
              name="taskUser"
              onChange={this.handleChangeUser}
            >
              <option selected value="">Choose user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>

            <button type="submit" className="form__button">
              Add task
            </button>
          </form>
          {this.state.error && (
            <p>{this.state.error}</p>
          )}
        </div>
      </div>
    );
  }
}

export default App;
