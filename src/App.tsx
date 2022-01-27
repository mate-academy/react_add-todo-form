import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList';

import users from './api/users';
import todosFromServer from './api/todos';

const findUserById = (userId: number) => {
  return users.find(user => user.id === userId) || null;
};

const preparedTodos: Todo[] = todosFromServer.map(todo => (
  {
    ...todo,
    user: findUserById(todo.userId),
  }
));

type State = {
  todos: Todo[],
  availableUsers: User[],
  newTodoTitle: string,
  newTodoUserId: number,
  hasTitleError: boolean,
  hasUserSelectionError: boolean,
};

class App extends React.Component<{}, State> {
  state = {
    todos: [...preparedTodos],
    availableUsers: [...users],
    newTodoTitle: '',
    newTodoUserId: 0,
    hasTitleError: false,
    hasUserSelectionError: false,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodoTitle: event.target.value,
      hasTitleError: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newTodoUserId: +event.target.value,
      hasUserSelectionError: false,
    });
  };

  getNewId = () => {
    const { todos } = this.state;
    const maxId = Math.max(...todos.map(todo => (
      todo.id
    )));

    return maxId + 1;
  };

  createNewTodo = (): Todo => {
    const { newTodoTitle, newTodoUserId } = this.state;

    return {
      userId: newTodoUserId,
      id: this.getNewId(),
      title: newTodoTitle,
      completed: false,
      user: findUserById(newTodoUserId),
    };
  };

  handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo = this.createNewTodo();
    const { newTodoTitle, newTodoUserId } = this.state;

    if (!newTodoTitle || !newTodoUserId) {
      this.setState({
        hasTitleError: !newTodoTitle,
        hasUserSelectionError: !newTodoUserId,
      });

      return;
    }

    this.setState(state => ({
      todos: [...state.todos, newTodo],
      newTodoTitle: '',
      newTodoUserId: 0,
    }));
  };

  render(): React.ReactNode {
    const {
      todos,
      availableUsers,
      newTodoTitle,
      newTodoUserId,
      hasTitleError,
      hasUserSelectionError,
    } = this.state;

    return (
      <div className="App">
        <h1 className="title is-1">Add todo form</h1>

        <form
          className="box form"
          onSubmit={this.handleSubmitForm}
        >
          <section>
            <input
              type="text"
              className="input is-small"
              placeholder="Enter todo title"
              value={newTodoTitle}
              onChange={this.handleTitleChange}
            />
            {hasTitleError && (
              <>
                <br />
                <span className="error">Please enter the title</span>
              </>
            )}
          </section>
          <section>
            <select
              className="select is-small"
              value={newTodoUserId}
              onChange={this.handleUserChange}
            >
              <option value="0">Choose responsible person:</option>
              {availableUsers.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            {hasUserSelectionError && (
              <>
                <br />
                <span className="error">Please choose a user</span>
              </>
            )}
          </section>
          <button
            type="submit"
            className="button is-outlined"
          >
            Add todo
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
