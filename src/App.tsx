import React from 'react';
import { TodoList } from './components/TodoList';

import { Todo } from './types/Todo';

import './App.scss';

import users from './api/users';
import todos from './api/todos';

const maxId = todos.sort((a, b) => b.id - a.id)[0].id;

type Props = {};

type State = {
  newTodos: Todo[],
  title: string;
  userId: number;
  id: number;
  titleWarning: boolean;
  userWarning: boolean;
};

export class App extends React.Component<Props, State> {
  state = {
    newTodos: [...todos],
    title: '',
    userId: 0,
    id: maxId,
    titleWarning: false,
    userWarning: false,
  };

  todoMaker = () => {
    const {
      title,
      userId,
    } = this.state;

    this.nextId();

    if (!title) {
      this.setState({ titleWarning: true });
    }

    if (userId === 0) {
      this.setState({ userWarning: true });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (title && userId !== 0) && (
      this.setState((state) => ({
        newTodos: [
          ...state.newTodos,
          {
            userId: +state.userId,
            id: state.id,
            title: state.title,
            completed: false,
          },
        ],
        title: '',
        userId: 0,
      }))
    );
  };

  nextId = () => {
    this.setState(current => ({
      id: current.id + 1,
    }));
  };

  render() {
    const {
      title,
      userId,
      newTodos,
      titleWarning,
      userWarning,
    } = this.state;

    return (
      <div className="App">
        <div className="warnings App__warnings">
          {titleWarning && (
            <div className="warnings__warning warnings__warning--title">
              Please write a title
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
              event.preventDefault();
              this.todoMaker();
            }}
          >
            <input
              type="text"
              className="input form__input"
              name="title"
              id="title"
              placeholder="Please write a title"
              value={title}
              onChange={(event) => {
                const cyrillic = /^[а-яА-Яё][а-яА-Яё\s-]*$/;
                const latin = /^[a-zA-Z][a-zA-Z\s-]*$/;
                const num = /^[0-9]*$/;

                const lastChar = event.target.value.slice(-1);

                const validSymbol
                  = cyrillic.test(lastChar) || latin.test(lastChar) || num.test(lastChar) || lastChar === ' ';

                this.setState(state => ({
                  titleWarning: false,
                  title: validSymbol ? event.target.value : state.title,
                }));
              }}
            />
            <div className="form__wrapper">
              <select
                name="userId"
                id="user"
                className="input form__input input--select"
                value={userId}
                onChange={(event) => {
                  this.setState({
                    userWarning: false,
                    userId: +event.target.value,
                  });
                }}
              >
                <option value={0}>
                  Select user
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
          <TodoList todos={newTodos} users={users} />
        </div>
      </div>
    );
  }
}
