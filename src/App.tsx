import React from 'react';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

const preparedTodos = todosFromServer.map(
  todo => {
    const user = usersFromServer
      .find(person => (person.id === todo.userId)) || null;

    return {
      ...todo,
      user,
    };
  },
);

interface State {
  todos: Todo[];
  userId: number;
  title: string;
  validatedInput: boolean;
  validatedSelect: boolean;
}

export class App extends React.Component<{}, State> {
  state: State = {
    todos: preparedTodos,
    userId: 0,
    title: '',
    validatedInput: true,
    validatedSelect: true,
  };

  handleChooseUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: +(event.target.value),
      validatedSelect: true,
    });
  };

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      title: value,
      validatedInput: true,
    });
  };

  validate = (id: number, title: string) => {
    let isValid = true;

    if (!id) {
      isValid = false;

      this.setState({
        validatedSelect: false,
      });
    }

    if (!title) {
      isValid = false;

      this.setState({
        validatedInput: false,
      });
    }

    return isValid;
  };

  addTodo = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { userId, title } = this.state;

    if (!this.validate(userId, title)) {
      return;
    }

    const newTodo = {
      id: userId + 1,
      user: usersFromServer.find(user => user.id === userId) || null,
      userId,
      title,
      completed: false,
    };

    this.setState((state) => ({
      todos: [
        ...state.todos,
        newTodo,
      ],
    }));

    this.setState({
      userId: 0,
      title: '',
    });
  };

  render() {
    const {
      todos,
      userId,
      title,
      validatedInput,
      validatedSelect,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>

        <form
          action=""
          className="todo-form"
          onSubmit={this.addTodo}
        >
          <label
            htmlFor="title"
            className="todo-form__label"
          >
            <input
              id="title"
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              autoComplete="off"
              value={title}
              onChange={this.handleChangeTitle}
            />

            {!validatedInput && (
              <p
                className="alert alert-danger"
                role="alert"
              >
                Please enter the title
              </p>
            )}
          </label>

          <label
            htmlFor="userId"
            className="todo-form__label"
          >
            <select
              name="userId"
              id="userId"
              className="form-select"
              aria-label="Default select example"
              value={userId}
              onChange={this.handleChooseUser}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(person => {
                const { id, name } = person;

                return (
                  <option
                    value={id}
                    key={id}
                  >
                    {name}
                  </option>
                );
              })}
            </select>

            {!validatedSelect && (
              <p
                className="alert alert-danger"
                role="alert"
              >
                Please choose a user
              </p>
            )}
          </label>

          <button
            type="submit"
            className="button btn btn-primary"
          >
            Add
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    );
  }
}
