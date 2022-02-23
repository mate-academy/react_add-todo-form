import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';

const getUserById = (id: number) => users.find(user => user.id === id);

const preparedTodos: PreparedTodo[] = todos.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId) || null,
}));

type Props = {};
type State = {
  currentTodos: PreparedTodo[];
  newTodoTitle: string;
  selectedUserId: number;
  hasTitleError: boolean;
  hasUserError: boolean;
};

export class App extends React.Component<Props, State> {
  state = {
    currentTodos: [...preparedTodos],
    newTodoTitle: '',
    selectedUserId: 0,
    hasTitleError: false,
    hasUserError: false,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodoTitle: event.target.value,
      hasTitleError: false,
    });
  };

  handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUserId: +event.target.value,
      hasUserError: false,
    });
  };

  addNewTodo = () => {
    const { currentTodos, newTodoTitle, selectedUserId } = this.state;

    const newTodo: PreparedTodo = {
      title: newTodoTitle,
      userId: selectedUserId,
      id: currentTodos.length + 1,
      completed: false,
      user: getUserById(selectedUserId) || null,
    };

    this.setState((prevState) => ({
      currentTodos: [...prevState.currentTodos, newTodo],
      newTodoTitle: '',
      selectedUserId: 0,
    }));
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { newTodoTitle, selectedUserId } = this.state;

    if (!newTodoTitle || !selectedUserId) {
      this.setState({
        hasTitleError: !newTodoTitle,
        hasUserError: !selectedUserId,
      });

      return;
    }

    this.addNewTodo();
  };

  render() {
    const {
      currentTodos,
      newTodoTitle:
      newTodoName,
      selectedUserId,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <div className="app">
        <h1 className="app__title">Add todo form</h1>

        <form
          onSubmit={this.handleSubmit}
          className="form"
        >
          <section>
            <input
              type="text"
              placeholder="Enter task"
              className="form__input"
              value={newTodoName}
              onChange={this.handleTitleChange}
            />
            {hasTitleError
              && <span className="form__alert">Please enter the title</span>}
          </section>

          <section>
            <select
              className="form__select"
              value={selectedUserId}
              onChange={this.handleUserSelect}
            >
              <option value="0">Select user</option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                  className="form__select-option"
                >
                  {user.name}
                </option>
              ))}
            </select>
            {hasUserError
              && <span className="form__alert">Please choose a user</span>}
          </section>

          <button
            type="submit"
            className="form__button"
          >
            Add
          </button>
        </form>

        <TodoList todos={currentTodos} />
      </div>
    );
  }
}
