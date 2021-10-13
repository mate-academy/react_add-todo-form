import React from 'react';
import './App.css';
import { Todo } from './types/Todo';
import TodoList from './components/TodoList/TodoList';
import todos from './api/todos';
import users from './api/users';

const preparedTodos: Todo[] = todos.map(todo => {
  const user = users.find(person => person.id === todo.userId);

  return {
    user: (user !== undefined) ? user : null,
    ...todo,
  };
});

type State = {
  todosFromState: Todo[],
  title: string,
  username: string,
  isTitleValid: boolean,
  isUserValid: boolean,
  isAddPressed: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    todosFromState: preparedTodos,
    title: '',
    username: '',
    isTitleValid: false,
    isUserValid: false,
    isAddPressed: false,
  };

  createNewTodo = () => {
    const { username, todosFromState, title } = this.state;
    const currentUser = users.find(user => user.name === username);

    return {
      user: currentUser !== undefined ? currentUser : null,
      userId: currentUser !== undefined ? currentUser.id : null,
      id: todosFromState.length + 1,
      title,
      completed: false,
    };
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { username, title } = this.state;

    if (username && title) {
      this.setState((state) => ({
        todosFromState: [
          ...state.todosFromState,
          this.createNewTodo(),
        ],
        title: '',
        username: '',
        isTitleValid: true,
        isUserValid: true,
      }));
    }

    this.setState((state) => ({
      isAddPressed: !state.isAddPressed,
    }));
  };

  render() {
    const { isTitleValid, isAddPressed, isUserValid } = this.state;

    return (
      <div className="App">
        <h1>Add a new Todo</h1>
        <div className="container">
          <form
            onSubmit={this.handleSubmit}
            className="form"
          >
            <input
              type="text"
              name="title"
              placeholder="Title"
              maxLength={10}
              value={this.state.title}
              pattern="^[0-9a-zA-ZА-Яа-яЁё\s]+$"
              className="input-title"
              onChange={(event) => {
                this.setState({
                  title: event.target.value,
                  isTitleValid: true,
                });
              }}
            />
            {!isTitleValid && isAddPressed && (
              <p className="input-warning">
                Please enter the title!
              </p>
            )}
            <select
              name="username"
              value={this.state.username}
              className="select-name"
              onChange={(event) => {
                this.setState({
                  username: event.target.value,
                  isUserValid: true,
                });
              }}
            >
              <option
                value=""
                disabled
                selected
              >
                Choose a user
              </option>
              {users.map(user => (
                <option key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {!isUserValid && isAddPressed && (
              <p className="select-warning">
                Please choose a user!
              </p>
            )}
            <button
              type="submit"
              className="submit-button"
            >
              Add
            </button>
          </form>
        </div>

        <TodoList todos={this.state.todosFromState} />
      </div>
    );
  }
}

export default App;
