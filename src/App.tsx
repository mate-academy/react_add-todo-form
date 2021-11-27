import React from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

const preparedTodos: Todo[] = todosFromServer.map((todo) => {
  const todoWithOwner = {
    ...todo,
    user: users.find((user) => user.id === todo.userId) || null,
  };

  return todoWithOwner;
});

type State = {
  todos: Todo[];
  taskDetails: string;
  user: string;
  taskDetailsProvided: boolean;
  userSelected: boolean;
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...preparedTodos],
    taskDetails: '',
    user: '',
    taskDetailsProvided: true,
    userSelected: true,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const taskDetails = event.target.value;

    if (taskDetails.length >= 80) {
      return;
    }

    this.setState({
      taskDetails,
      taskDetailsProvided: true,
    });
  };

  setNewuser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      user: event.target.value,
      userSelected: true,
    });
  };

  addTodo = () => {
    const { todos, taskDetails, user } = this.state;

    // eslint-disable-next-line operator-linebreak
    const currentUser: User | null =
      users.find((userFromServer) => userFromServer.name === user) || null;

    if (!currentUser) {
      return;
    }

    const newTodo: Todo = {
      userId: currentUser.id,
      id: todos.length + 1,
      title: taskDetails,
      completed: false,
      user: currentUser,
    };

    this.setState({
      todos: [...todos, newTodo],
    });
  };

  clearForm = () => {
    this.setState({
      taskDetails: '',
      user: '',
    });
  };

  validateSumbitData = () => {
    const { taskDetails, user } = this.state;

    this.setState({
      taskDetailsProvided: taskDetails !== '',
    });

    this.setState({
      userSelected: user !== '',
    });

    return taskDetails && user;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // eslint-disable-next-line no-console
    if (!this.validateSumbitData()) {
      return;
    }

    this.addTodo();
    this.clearForm();
  };

  render() {
    // eslint-disable-next-line object-curly-newline
    const {
      todos,
      taskDetails,
      user,
      taskDetailsProvided,
      userSelected,
    } = this.state;

    return (
      <div className="App">
        <form className="AddTodo" onSubmit={this.handleSubmit}>
          <div className="AddTodo__API">
            <div className="AddTodo__user-select-wrapper">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="userSelect" className="AddTodo__user-label">
                Choose a user:
              </label>

              <select
                name="user"
                id="userSelect"
                value={user}
                className="AddTodo__user-select"
                onChange={this.setNewuser}
              >
                <option value="">Please choose a user</option>
                {users.map(({ id, name }) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </select>

              {!userSelected && (
                <p className="AddTodo__error">Please, select a user</p>
              )}
            </div>

            <div className="AddTodo__input-wrapper">
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label htmlFor="title" className="AddTodo__task-label">
                TODO:
              </label>

              <input
                type="text"
                name="taskDetails"
                id="title"
                value={taskDetails}
                placeholder="Task deatils"
                className="AddTodo__task-field"
                onChange={this.handleTitleChange}
              />

              {!taskDetailsProvided && (
                <p className="AddTodo__error">Please, provide task deatils</p>
              )}
            </div>
          </div>

          <button type="submit" className="AddTodo__button">
            Make the user labor
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
