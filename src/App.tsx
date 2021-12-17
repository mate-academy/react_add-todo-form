import React from 'react';
import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

type State = {
  todos: Todo[],
  todoTitle: string,
  user: string,
  userError: string | null,
  titleError: string | null,
};

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...preparedTodos],
    todoTitle: '',
    user: '',
    userError: null,
    titleError: null,
  };

  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { todoTitle, user } = this.state;

    const userError = user
      ? null
      : '❌ Please, choose a user!';

    const titleError = todoTitle
      ? null
      : '❌ Please, enter the title!';

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

    const currentUser: User | null = users.find(userFromServer => (
      userFromServer.name === user)) || null;

    if (!currentUser) {
      throw new Error('No user!');
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

  render(): React.ReactNode {
    return (
      <div className="App">
        <div className="form">
          <h2 className="form__heading">
            Add a task:
          </h2>

          <form
            className="form__content"
            action="POST"
            onSubmit={this.handleSubmit}
          >
            <div className="form__input-area">
              <label htmlFor="title">
                Name of the task:
                <input
                  type="text"
                  id="title"
                  placeholder="Title"
                  className="form__input"
                  value={this.state.todoTitle}
                  onChange={this.handleTitleChange}
                />
              </label>

              {this.state.titleError && (
                <p className="form__error">
                  {this.state.titleError}
                </p>
              )}
            </div>

            <div className="form__input-area">
              <label htmlFor="user">
                Choose user:
                <select
                  name="user"
                  id="user"
                  className="form__select"
                  value={this.state.user}
                  onChange={this.handleUserChange}
                >
                  <option value="" disabled>
                    Choose user
                  </option>
                  {users.map(user => (
                    <option value={user.name} key={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>

                {this.state.userError && (
                  <p className="form__error">
                    {this.state.userError}
                  </p>
                )}
              </label>
            </div>

            <button type="submit" className="form__button">
              Add todo
            </button>
          </form>
        </div>

        <div className="todos">
          <h1 className="todos__heading">
            Things to do:
          </h1>

          <div>
            <TodoList preparedTodos={this.state.todos} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
