import React from 'react';
import { TodoList } from './components/TodoList';
import { getUserById } from './helper';

import './App.scss';

import todos from './api/todos';
import users from './api/users';

const preparedTodos: Todo[] = todos.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId) || null,
}));

type State = {
  allTodos: Todo[],
  newTodoTitle: string;
  selectedUserId: number;
  hasTitleError: boolean;
  hasUserError: boolean;
};

class App extends React.Component<{}, State> {
  state: State = {
    allTodos: [...preparedTodos],
    newTodoTitle: '',
    selectedUserId: 0,
    hasTitleError: false,
    hasUserError: false,
  };

  addNewTodo = (newTodo: Todo) => {
    this.setState((state) => ({
      allTodos: [...state.allTodos, newTodo],
    }));
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodoTitle: event.target.value,
      hasTitleError: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUserId: +event.target.value,
      hasUserError: false,
    });
  };

  getNewTodo = () => {
    const { allTodos, newTodoTitle, selectedUserId } = this.state;

    const newTodo: Todo = {
      id: allTodos.length + 1,
      title: newTodoTitle,
      userId: selectedUserId,
      completed: false,
      user: getUserById(selectedUserId) || null,
    };

    return newTodo;
  };

  clearState = () => {
    this.setState({
      newTodoTitle: '',
      selectedUserId: 0,
    });
  };

  validateForm = () => {
    const { newTodoTitle, selectedUserId } = this.state;

    if (!newTodoTitle || !selectedUserId) {
      this.setState({
        hasTitleError: !newTodoTitle,
        hasUserError: !selectedUserId,
      });

      return false;
    }

    return true;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isFormValid = this.validateForm();

    if (isFormValid) {
      const newTodo = this.getNewTodo();

      this.addNewTodo(newTodo);
      // this.clearState();
    }
  };

  render() {
    const {
      allTodos,
      newTodoTitle,
      selectedUserId,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <div className="App">
        <form action="post" onSubmit={this.handleSubmit}>
          <section>
            <input
              type="text"
              placeholder="Write your task"
              value={newTodoTitle}
              onChange={this.handleTitleChange}
            />
            {hasTitleError && (
              <span>Please enter the title</span>
            )}
          </section>

          <section>
            <select
              value={selectedUserId}
              onChange={this.handleUserChange}
            >
              <option value="0">Choose a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            {hasUserError && (
              <span>Please choose a user</span>
            )}
          </section>

          <button type="submit">
            Add
          </button>
        </form>
        <TodoList todos={allTodos} />
      </div>
    );
  }
}

export default App;
