import React from 'react';
import './App.scss';
import 'bulma/css/bulma.min.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number) => (
  users.find(user => user.id === userId)
);

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId) || null,
}));

type State = {
  todoList: Todo[];
  newTitle: string;
  selectedUserId: number;
  isTitleInvalid: boolean;
  isUserInvalid: boolean;
};

class App extends React.Component<{}, State> {
  state: State = {
    todoList: [...preparedTodos],
    newTitle: '',
    selectedUserId: 0,
    isTitleInvalid: false,
    isUserInvalid: false,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTitle: event.target.value,
      isTitleInvalid: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUserId: +event.target.value,
      isUserInvalid: false,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isFormValid = this.validateForm();

    if (isFormValid) {
      this.addNewTodo();
      this.clearState();
    }
  };

  validateForm = () => {
    const { selectedUserId, newTitle } = this.state;

    if (!selectedUserId || !newTitle.trim()) {
      this.setState({
        isTitleInvalid: !newTitle.trim(),
        isUserInvalid: !selectedUserId,
      });

      return false;
    }

    return true;
  };

  getNewTodo = () => {
    const {
      selectedUserId,
      newTitle,
      todoList,
    } = this.state;

    const newTodo = {
      user: getUserById(selectedUserId) || null,
      userId: selectedUserId,
      id: todoList.length + 1,
      title: newTitle.trim(),
      completed: false,
    };

    return newTodo;
  };

  clearState = () => {
    this.setState({
      newTitle: '',
      selectedUserId: 0,
      isTitleInvalid: false,
      isUserInvalid: false,
    });
  };

  addNewTodo = () => {
    const newTodo = this.getNewTodo();

    this.setState((state) => ({
      todoList: [...state.todoList, newTodo],
    }));
  };

  render() {
    const {
      selectedUserId,
      newTitle,
      todoList,
      isTitleInvalid,
      isUserInvalid,
    } = this.state;

    return (
      <div className="App">
        <h2 className="neon-text">Add todo form</h2>
        <div className="form">
          <form
            className="form columns is-mobile is-centered"
            onSubmit={this.handleSubmit}
          >
            <div>
              <label htmlFor="todo-title">
                <input
                  type="text"
                  className="input is-primary is-rounded"
                  name="title"
                  value={newTitle}
                  onChange={this.handleTitleChange}
                  placeholder="Title"
                />
              </label>
              {isTitleInvalid && (
                <div className="error">Please enter the title</div>
              )}
            </div>

            <div className="select is-primary ml-5">
              <select
                name="selectedUserId"
                value={selectedUserId}
                onChange={this.handleUserChange}
              >
                <option value="0">Choose a user</option>
                {users.map(user => (
                  <option value={user.id} key={user.id}>{user.name}</option>
                ))}
              </select>
              {isUserInvalid && (
                <div className="error">Please choose a user</div>
              )}
            </div>

            <button type="submit" className="button is-primary ml-5">Add</button>
          </form>
        </div>

        <div>
          <TodoList preparedTodos={todoList} />
        </div>
      </div>
    );
  }
}

export default App;
