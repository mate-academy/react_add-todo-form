import React from 'react';
import './App.scss';

import users from './api/users';
import todosFromApi from './api/todos';
import { TodoList } from './components/TodoList';

const preparedTodos: PrepearedTodo[] = todosFromApi.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id) || null,
}));

type State = {
  todos: PrepearedTodo[];
  title: string;
  selectedUserId: number;
  hasTitleInputError: boolean;
  hasUserSelectError: boolean;
  hasWrongCharError: boolean;
};

class App extends React.PureComponent<{}, State> {
  state: State = {
    todos: preparedTodos,
    title: '',
    selectedUserId: 0,
    hasTitleInputError: false,
    hasUserSelectError: false,
    hasWrongCharError: false,
  };

  handleInputChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event?.target.value,
      hasTitleInputError: false,
      hasWrongCharError: false,
    });
  };

  handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUserId: Number(event?.target.value),
      hasUserSelectError: false,
    });
  };

  clearForm = () => {
    this.setState({
      title: '',
      selectedUserId: 0,
    });
  };

  validateForm = () => {
    const { title, selectedUserId } = this.state;
    const isTitleError = /[a-zа-яA-ZА-ЯёЁ0-9]+$/.test(title);

    if (!title || !selectedUserId || !isTitleError) {
      this.setState({
        hasTitleInputError: !title,
        hasUserSelectError: !selectedUserId,
        hasWrongCharError: !isTitleError,
      });

      return false;
    }

    return true;
  };

  handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { selectedUserId, title, todos } = this.state;
    const isFormValid = this.validateForm();

    if (isFormValid) {
      const newTodoId: number = Math.max(...todos.map(todo => todo.id)) + 1;

      this.setState((prevState) => ({
        todos: [...prevState.todos,
          {
            userId: selectedUserId,
            id: newTodoId,
            title,
            completed: false,
            user: users.find(user => selectedUserId === user.id) || null,
          },
        ],
      }));
      this.clearForm();
    }
  };

  render() {
    const {
      todos,
      title,
      selectedUserId,
      hasTitleInputError,
      hasUserSelectError,
      hasWrongCharError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <label htmlFor="title-todo" className="label">
              New Todo
              <input
                type="text"
                id="title-todo"
                placeholder="Enter Todo here"
                value={title}
                onChange={this.handleInputChangeName}
              />
              {hasTitleInputError && (
                <span>Please enter the title</span>
              )}

              {title.length > 0 && hasWrongCharError && (
                <span>Yoy can enter only digits or letters</span>
              )}
            </label>
          </div>

          <div>
            <label htmlFor="select-user" className="label">
              Select user
              <select
                id="select-user"
                value={selectedUserId}
                onChange={this.handleSelectUser}
              >
                <option value="0">Select user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {hasUserSelectError && (
                <span>Please choose a user</span>
              )}
            </label>
          </div>

          <div>
            <button type="submit">Add Todo</button>
          </div>
        </form>
        <TodoList todos={todos} />
        <p>
          <span>Users: </span>
          {users.length}
        </p>

      </div>
    );
  }
}

export default App;
