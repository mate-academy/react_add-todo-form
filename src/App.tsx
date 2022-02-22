import React from 'react';
import './App.scss';
import todosFromServer from './api/todos';

import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { Todo, User } from './types/types';

const preparedTodos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: users.find((user) => user.id === todo.userId) || null,
}));

type State = {
  todos: Todo[];
  userName: string;
  title: string,
  inputError: boolean,
  selectError: boolean,
};

export class App extends React.Component<{}, State> {
  state: State = {
    todos: [...preparedTodos],
    userName: '',
    title: '',
    inputError: false,
    selectError: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      inputError: false,
    });
  };

  setUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      userName: value,
      selectError: false,
    });
  };

  addTodo = () => {
    const currentUser: User | null = users.find(
      user => (user.name === this.state.userName),
    ) || null;

    if (currentUser === null) {
      return;
    }

    const createdTodo: Todo = {
      userId: currentUser.id,
      title: this.state.title,
      id: this.state.todos.length + 1,
      user: currentUser,
      completed: false,
    };

    this.setState((state) => ({
      todos: [...state.todos, createdTodo],
    }));
  };

  clearForm = () => {
    this.setState({
      title: '',
      userName: '',
    });
  };

  validateSubmit = () => {
    const { title, userName } = this.state;

    this.setState({
      selectError: userName === '',
      inputError: title === '',
    });

    return title && userName;
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!this.validateSubmit()) {
      return;
    }

    this.addTodo();
    this.clearForm();
  };

  render() {
    const {
      todos, selectError, inputError, userName, title,
    } = this.state;

    const { handleChange, handleSubmit, setUser } = this;

    return (
      <div className="App">
        <div className="App__content">
          <div className="form">
            <form
              className="form__wrapper"
              onSubmit={handleSubmit}
            >
              <div className="form__content">
                <input
                  type="text"
                  value={title}
                  className="form__todo-input"
                  onChange={handleChange}
                />
                <label htmlFor="form__select-label">
                  <select
                    name="user"
                    id="form__select-1"
                    className="form__select"
                    value={userName}
                    onChange={setUser}
                  >
                    <option>Please choose a user</option>
                    {users.map((user) => (
                      <option key={user.id} value={user.name}>{user.name}</option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="form__errors">
                {inputError && (
                  <div className="form__error">
                    Please enter the title
                  </div>
                )}
                {selectError && (
                  <div className="form__error">
                    Please choose a user
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="form__button"
              >
                Add
              </button>
            </form>
          </div>
          <TodoList preparedTodos={todos} />
        </div>
      </div>
    );
  }
}

export default App;
