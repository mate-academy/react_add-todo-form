import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList';

const preparedTodos: PreparedTodos[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

type State = {
  todos: PreparedTodos[],
  title: string;
  selectedUserId: number;
  hasUserError: boolean,
  hasTitleError: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...preparedTodos],
    title: '',
    selectedUserId: 0,
    hasUserError: false,
    hasTitleError: false,
  };

  addNewTask = (newToDo: PreparedTodos) => {
    this.setState((state) => ({
      todos: [...state.todos, newToDo],
    }));
  };

  getUserById = (userId: number) => users.find(
    user => user.id === userId,
  );

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      hasTitleError: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUserId: +event.target.value,
      hasUserError: false,
    });
  };

  getNewTask = () => {
    const { title, selectedUserId } = this.state;
    const maxId = Math.max(...(todos.map((todo) => todo.id)));

    return {
      userId: selectedUserId,
      id: maxId + 1,
      title,
      completed: false,
      user: this.getUserById(selectedUserId) || null,
    };
  };

  clearState = () => {
    this.setState({
      title: '',
      selectedUserId: 0,
      hasUserError: false,
      hasTitleError: false,
    });
  };

  validateForm = () => {
    const { title, selectedUserId } = this.state;

    if (!title || !selectedUserId) {
      this.setState({
        hasUserError: !selectedUserId,
        hasTitleError: !title,
      });

      return false;
    }

    return true;
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.validateForm()) {
      const newTask = this.getNewTask();

      this.addNewTask(newTask);
      this.clearState();
    }
  };

  render() {
    const {
      title,
      selectedUserId,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <div className="App">
        <div className="form">

          <div className="ui card form__card">
            <div className="content">
              <h1 className="header">
                Add new tasks
              </h1>
            </div>

            <div className="description">
              <form
                className="ui form"
                onSubmit={this.handleSubmit}
              >
                <section className="field">
                  {hasTitleError && (
                    <span className="ui small header red">Please enter a task</span>
                  )}
                  <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={this.handleTitleChange}
                  />
                </section>

                <section className="field">
                  {hasUserError && (
                    <span className="ui small header red">Please choose a user</span>
                  )}
                  <select
                    value={selectedUserId}
                    onChange={this.handleUserChange}
                  >
                    <option value="0">Choose a user</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>{user.name}</option>
                    ))}
                  </select>
                </section>

                <button
                  className="ui bottom attached fluid button blue"
                  type="submit"
                >
                  Add Task
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="todoList">
          <TodoList todoItems={this.state.todos} />
        </div>
      </div>
    );
  }
}

export default App;
