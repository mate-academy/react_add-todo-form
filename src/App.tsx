import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo, User } from './types';

interface State {
  users: User[]
  todos: Todo[];
  todoTitle: string;
  selectedUser: string;
  isTitleValid: boolean;
  isUserValid: boolean;
}

class App extends React.Component<{}, State> {
  state = {
    users,
    todos,
    todoTitle: '',
    selectedUser: '',
    isTitleValid: true,
    isUserValid: true,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === 'todoTitle') {
      this.setState({ isTitleValid: true });
    }

    if (name === 'selectedUser') {
      this.setState({ isUserValid: true });
    }

    return this.setState(state => ({
      ...state,
      [name]: value,
    }));
  };

  addTask = () => {
    const { todoTitle, selectedUser } = this.state;

    const choosenUser = this.state.users.find(user => user.name === selectedUser);

    if (!choosenUser || !todoTitle.length) {
      return this.showError();
    }

    const newTodo: Todo = {
      userId: choosenUser.id,
      id: this.state.todos.length + 1,
      title: todoTitle,
      completed: false,
    };

    return this.setState(state => ({
      todos: [...state.todos, newTodo],
      todoTitle: '',
      selectedUser: '',
    }));
  };

  showError = () => {
    const { todoTitle, selectedUser } = this.state;

    if (!todoTitle.length) {
      this.setState({
        isTitleValid: false,
      });
    }

    if (!selectedUser.length) {
      this.setState({
        isUserValid: false,
      });
    }
  };

  render() {
    const {
      selectedUser,
      todoTitle,
      isTitleValid,
      isUserValid,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          className="todoForm"
          action=""
          method="GET"
          onSubmit={(event) => (event.preventDefault())}
        >
          <label htmlFor="todo" className="todoForm__label">
            Укажите задание:
            <input
              id="todo"
              type="text"
              name="todoTitle"
              placeholder="Завари чайку"
              className="todoForm__input"
              value={todoTitle}
              onChange={this.handleChange}
            />
            {!isTitleValid
            && (
              <span className="error">
                Please enter the task
              </span>
            )}
          </label>

          <label htmlFor="selectName" className="todoForm__label">
            Кто будет выполнять задачу:
            <select
              name="selectedUser"
              className="todoForm__input"
              id="selectName"
              value={selectedUser}
              onChange={this.handleChange}
            >
              <option value="">
                Who will be a chosen one?
              </option>
              {
                users.map(user => (
                  <option
                    value={user.name}
                    key={user.id}
                  >
                    {user.name}
                  </option>
                ))
              }
            </select>
            {!isUserValid
              && (
                <span className="error">
                  Please choose someone
                </span>
              )}
          </label>
          <button
            type="submit"
            onClick={this.addTask}
            className="button"
          >
            Добавить задание
          </button>
        </form>
        <TodoList
          todos={this.state.todos}
          users={this.state.users}
        />
      </div>
    );
  }
}

export default App;
