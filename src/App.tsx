import React from 'react';
import { TodoList } from './components/TodoList';

import { Todo } from './types/Todo';

import './App.scss';

import users from './api/users';
import todos from './api/todos';

type Props = {};

type State = {
  newTodos: Todo[],
  title: string;
  userId: number;
  titleWarning: boolean;
  userWarning: boolean;
};

const maxId = (arr: Todo[]) => (
  arr.sort((a, b) => b.id - a.id)[0].id
);

const isValidChar = (char: string) => {
  const cyrillic = /^[а-яА-Яё][а-яА-Яё\s-]*$/;
  const latin = /^[a-zA-Z][a-zA-Z\s-]*$/;
  const num = /^[0-9]*$/;

  return cyrillic.test(char)
    || latin.test(char)
    || num.test(char)
    || char === ' ';
};

export class App extends React.Component<Props, State> {
  state = {
    newTodos: [...todos],
    title: '',
    userId: 0,
    titleWarning: false,
    userWarning: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = event.target;
    const lastChar = event.target.value.slice(-1);

    if (isValidChar(lastChar)) {
      this.setState(state => ({
        ...state,
        [name]: value,
      }));
    }
  };

  createTodo = (event: React.SyntheticEvent) => {
    const {
      title,
      userId,
    } = this.state;

    event.preventDefault();

    if (!title) {
      this.setState({ titleWarning: true });
    }

    if (+userId === 0) {
      this.setState({ userWarning: true });
    }

    if (title && +userId !== 0) {
      this.setState((state) => ({
        newTodos: [
          ...state.newTodos,
          {
            userId: +state.userId,
            id: maxId(state.newTodos) + 1,
            title: state.title,
            completed: false,
          },
        ],
        title: '',
        userId: 0,
      }));
    }
  };

  render() {
    const {
      title,
      userId,
      newTodos,
      titleWarning,
      userWarning,
    } = this.state;

    const preparedTodos = newTodos.map((todo) => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));

    return (
      <div className="App">
        <div className="warnings App__warnings">
          {titleWarning && (
            <div className="warnings__warning warnings__warning--title">
              Please enter a title
            </div>
          )}
          {userWarning && (
            <div className="warnings__warning warnings__warning--user">
              Please choose a usere
            </div>
          )}
        </div>
        <div className="content App__content">
          <h2 className="title content__title">
            Add todo form
          </h2>
          <form
            action="/"
            method="get"
            className="form content__form"
            onSubmit={(event) => {
              this.createTodo(event);
            }}
          >
            <input
              type="text"
              className="input form__input"
              name="title"
              placeholder="Please enter the title"
              value={title}
              onChange={(event) => {
                this.setState({ titleWarning: false });
                this.handleChange(event);
              }}
            />
            <div className="form__wrapper">
              <select
                name="userId"
                className="input form__input input--select"
                value={userId}
                onChange={(event) => {
                  this.handleChange(event);
                  this.setState({ userWarning: false });
                }}
              >
                <option value={0}>
                  Please choose a user
                </option>
                {users.map(user => (
                  <option
                    className="input__option"
                    value={user.id}
                    key={user.id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>

              <button
                className="button form__button"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
          <TodoList todos={preparedTodos} />
        </div>
      </div>
    );
  }
}
