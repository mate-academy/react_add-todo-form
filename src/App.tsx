import React from 'react';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { Todo, User } from './types';

type State = {
  todos: Todo[],
  todoTitle: string,
  user: string,
  userError: string | null,
  titleError: string | null,
};

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...preparedTodos],
    todoTitle: '',
    user: '',
    titleError: null,
    userError: null,
  };

  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { user, todoTitle } = this.state;

    const titleError = todoTitle
      ? null
      : 'Please enter the title';

    const userError = user
      ? null
      : 'Please choose a user';

    const isTodoValid = !userError && !titleError;

    if (isTodoValid) {
      this.addTodo();
      this.clearForm();
    } else {
      this.setState({
        userError,
        titleError,
      });
    }
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      todoTitle: value,
      titleError: null,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      user: value,
      userError: null,
    });
  };

  addTodo = () => {
    const { todos, todoTitle, user } = this.state;

    const currentUser: User | null = usersFromServer.find(userFromServer => (
      userFromServer.name === user)) || null;

    if (!currentUser) {
      throw new Error('Where is user!');
    }

    const createdTodo: Todo = {
      user: currentUser,
      userId: currentUser.id,
      id: todos.length + 1,
      title: todoTitle,
      completed: false,
    };

    this.setState((state: State) => ({
      todos: [
        ...state.todos,
        createdTodo,
      ],
    }));
  };

  clearForm = () => {
    this.setState({
      todoTitle: '',
      user: '',
    });
  };

  render() {
    return (
      <div className="App">
        <div>
          <h1>
            Add a task:
          </h1>

          <form
            onSubmit={this.handleSubmit}
          >
            <div>
              <label htmlFor="title">
                Name of the task:
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  value={this.state.todoTitle}
                  onChange={this.handleTitleChange}
                />
              </label>

              {this.state.titleError && (
                <p>
                  {this.state.titleError}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="user">
                Choose user:
                <select
                  name="user"
                  id="user"
                  value={this.state.user}
                  onChange={this.handleUserChange}
                >
                  <option value="" disabled>
                    Choose user
                  </option>
                  {usersFromServer.map(user => (
                    <option value={user.name} key={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>

                {this.state.userError && (
                  <p>
                    {this.state.userError}
                  </p>
                )}
              </label>
            </div>

            <button type="submit">
              Add todo
            </button>
          </form>
        </div>

        <div>
          <h2>
            Should to do:
          </h2>

          <div>
            <TodoList preparedTodos={this.state.todos} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
