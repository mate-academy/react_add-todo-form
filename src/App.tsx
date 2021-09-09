import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './react-app-env';

const preparedTodos: Todo[] = todos.map(todo => {
  return ({
    user: users.find(user => user.id === todo.userId) || null,
    title: todo.title,
    completed: todo.completed,
    id: todo.id,
  });
});

interface State {
  userName: string;
  title: string;
  stateTodos: Todo[];
  titleIsValid: boolean;
  userNameIsValid: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
    userName: '',
    title: '',
    stateTodos: preparedTodos,
    titleIsValid: true,
    userNameIsValid: true,
  };

  clearForm = () => {
    this.setState({
      userName: '',
      title: '',
    });
  };

  addUser = (event: React.FormEvent<HTMLFormElement>) => {
    const { title, userName } = this.state;

    event.preventDefault();

    this.setState((currentState) => ({
      titleIsValid: !!currentState.title,
      userNameIsValid: !!currentState.userName,
    }));

    if (!!userName && !!title) {
      this.setState((currentState) => {
        const temporaryTodos = [...currentState.stateTodos];
        const maxId = temporaryTodos
          .reduce((prev, curr) => (prev.id > curr.id ? prev : curr)).id + 1;

        temporaryTodos.push({
          user: users.find((user) => user.name === userName) || null,
          title,
          completed: false,
          id: maxId,
        });

        return ({
          stateTodos: temporaryTodos,
        });
      }, this.clearForm);
    }
  };

  handleChangeSelect = (event: React.FormEvent<HTMLSelectElement>) => {
    const { value } = event.currentTarget;

    this.setState({
      userName: value,
      userNameIsValid: !!value,
    });
  };

  handleChangeInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    this.setState({
      title: value,
      titleIsValid: !!value,
    });
  };

  render() {
    const {
      userName,
      title,
      stateTodos,
      titleIsValid,
      userNameIsValid,
    } = this.state;

    return (
      <>
        <header className="header">
          <h1 className="header__title">Static list of todos</h1>

          <form
            action="post"
            onSubmit={this.addUser}
            className="form header__form"
          >
            Add new todo:

            <select
              name="user"
              id="user"
              value={userName}
              onChange={this.handleChangeSelect}
              className="form__select"
              defaultValue=""
            >
              <option
                value=""
                disabled
              >
                Please choose a user
              </option>

              {users.map(selectedUser => (
                <option value={selectedUser.name}>
                  {selectedUser.name}
                </option>
              ))}

            </select>

            {!userNameIsValid && (
              <span className="form__validation">
                ⚠️ Please, select user
              </span>
            )}

            <input
              type="text"
              name="title"
              placeholder="Todo title"
              value={title}
              onChange={this.handleChangeInput}
              className="form__input"
            />

            {!titleIsValid && (
              <span className="form__validation">
                ⚠️ Please, type the title
              </span>
            )}

            <button type="submit">
              Add Todo
            </button>
          </form>
        </header>

        <div className="App">
          <TodoList todos={stateTodos} />
        </div>
      </>
    );
  }
}

export default App;
