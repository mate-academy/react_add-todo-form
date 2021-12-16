/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable object-curly-newline */
import React from 'react';
import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './type/Todo';
import { User } from './type/User';

const newtodosFromServer = todosFromServer.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId),
  };
});

interface State {
  todos: Todo[];
  user: User | undefined;
  title: string;
  userValue: string,
  userSelected: boolean,
  titleInputed: boolean,
  errorSelect: boolean,
  errorInput: boolean,
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...newtodosFromServer],
    user: {} as User,
    title: '',
    userValue: '',
    userSelected: false,
    titleInputed: false,
    errorSelect: false,
    errorInput: false,
  };

  setUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    const currentUserId = users.find(item => item.name === value);

    if (value) {
      this.setState({ user: currentUserId, userSelected: true, userValue: value, errorSelect: false });
    }
  };

  setTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ title: value, titleInputed: true, errorInput: false });
  };

  clearForm = () => {
    this.setState({
      userValue: '',
      title: '',
      userSelected: false,
      titleInputed: false,
    });
  };

  addToForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTodo: Todo = {
      user: this.state.user,
      title: this.state.title,
      userId: this.state.user ? this.state.user.id : 0,
      completed: false,
      id: this.state.todos[this.state.todos.length - 1].id + 1,
    };

    if (this.state.userSelected && this.state.titleInputed) {
      this.setState((state) => {
        return {
          todos: [
            ...state.todos,
            newTodo,
          ],
        };
      });
    } else {
      this.setState({ errorInput: true, errorSelect: true });
    }

    this.clearForm();
  };

  render() {
    const { todos, userValue, title, errorInput, errorSelect } = this.state;

    return (
      <div className="App">

        <form onSubmit={this.addToForm} className="form">
          <div className="form__select-user-group">

            <label className="form__label">
              Оберіть юзера:
            </label>

            <select
              className={errorSelect ? 'error form__select' : 'form__select'}
              name="user"
              value={userValue}
              onChange={this.setUser}
            >
              <option value="">Choose a user</option>
              {users.map(userOne => (
                <option value={userOne.name} key={userOne.id}>
                  {userOne.name}
                </option>
              ))}
            </select>

            {errorSelect && (
              <label className="error-label">
                Ви не обрали юзера
              </label>
            )}
          </div>

          <div className="form__input-title-group">
            <label className="form__label">
              Введіть тект завдання:
            </label>

            <input
              className={errorInput ? 'error form__select' : 'form__input'}
              type="text"
              name="title"
              value={title}
              onChange={this.setTitle}
            />

            {errorInput && (
              <label className="error-label">
                Ви не вели завдання
              </label>
            )}
          </div>

          <button type="submit">
            Додати до списку задач
          </button>

        </form>

        <TodoList
          props={todos}
        />
      </div>
    );
  }
}

export default App;
