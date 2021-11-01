import React from 'react';
import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

type State = {
  todos: Todo[],
  title: string,
  name: string,
  hasNameError: boolean,
  hasTitleError: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...todosFromServer],
    title: '',
    name: '',
    hasNameError: false,
    hasTitleError: false,
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(prevState => {
      if (!prevState.name || !prevState.title) {
        return {
          ...prevState,
          hasNameError: !prevState.name,
          hasTitleError: !prevState.title,
        };
      }

      const maxId = Math.max(...prevState.todos.map(todo => todo.id));
      const newTitle = prevState.title;
      const userIndex = users.findIndex(user => user.name === prevState.name);

      const newTodo: Todo = {
        id: maxId + 1,
        title: newTitle,
        userId: users[userIndex].id,
        completed: false,
      };

      return {
        hasNameError: false,
        name: '',
        hasTitleError: false,
        title: '',
        todos: [
          newTodo,
          ...prevState.todos,
        ],
      };
    });
  };

  handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      name: event.target.value,
      hasNameError: false,
    });
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === ' ') {
      this.setState({
        title: '',
        hasTitleError: false,
      });
    } else {
      this.setState({
        title: event.target.value,
        hasTitleError: false,
      });
    }
  };

  render() {
    const {
      title,
      name,
      todos,
      hasNameError,
      hasTitleError,
    } = this.state;

    return (
      <div className="App">
        <div className="App__container">
          <h1>Add todo form</h1>
          <form
            className="App__form"
            onSubmit={this.handleFormSubmit}
          >
            <div>
              <select
                className="App__select inputs"
                name="user"
                value={name}
                onChange={this.handleNameChange}
              >
                <option value="">Select user</option>
                {users.map(user => (
                  <option
                    key={user.id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>
              {hasNameError && (
                <div className="error">
                  Please choose user
                </div>
              )}
            </div>
            <div>
              <input
                type="text"
                value={title}
                placeholder="Enter task"
                className="App__input inputs"
                onChange={this.handleTitleChange}
              />
              {hasTitleError && (
                <div className="error">
                  Please enter task
                </div>
              )}
            </div>
            <div>
              <button
                type="submit"
                className="App__button"
              >
                Add
              </button>
            </div>
          </form>
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}

export default App;
