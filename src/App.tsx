import React, { FormEvent } from 'react';
import classNames from 'classnames';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { Todo } from './components/Todo';
import { TodoList } from './components/TodoList/TodoList';

export const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

type State = {
  currentTodos: Todo[];
  userId: number;
  title: string;
  isUserSelected: boolean;
  isTitleAdded: boolean,
  maxLengthOfTitle: number,
  moreThanMaxLength: boolean
};

class App extends React.Component<{}, State> {
  state = {
    currentTodos: preparedTodos,
    userId: 0,
    title: '',
    isUserSelected: false,
    isTitleAdded: false,
    maxLengthOfTitle: 60,
    moreThanMaxLength: false,
  };

  handlerSelectionOfUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      userId: +value,
      isUserSelected: false,
    });
  };

  handlerAdderOfTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { maxLengthOfTitle } = this.state;

    this.setState({
      title: value.length > maxLengthOfTitle ? value.slice(0, maxLengthOfTitle) : value,
      isTitleAdded: false,
      moreThanMaxLength: value.length > maxLengthOfTitle,
    });
  };

  addNewTodo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      userId,
      title,
    } = this.state;

    if (userId === 0 || !title.trim().length) {
      this.setState({
        isUserSelected: !userId,
        isTitleAdded: !title.trim().length,
      });

      return;
    }

    this.setState(prevState => {
      const newTodo = {
        id: todos.length + 1,
        userId,
        user: users.find(user => user.id === userId) || null,
        title,
        completed: false,
      };

      return ({
        currentTodos: [...prevState.currentTodos, newTodo],
        userId: 0,
        title: '',
        moreThanMaxLength: false,
      });
    });
  };

  render() {
    const {
      currentTodos,
      userId,
      title,
      isUserSelected,
      isTitleAdded,
      moreThanMaxLength,
      maxLengthOfTitle,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <div className="container">
          <form
            className="container__form form"
            onSubmit={this.addNewTodo}
          >
            <select
              className={classNames('form__select', { form__select_error: isUserSelected })}
              value={userId}
              onChange={this.handlerSelectionOfUser}
            >
              <option value="">
                Choose a user
              </option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              className={classNames('form__input', { form__input_error: isTitleAdded })}
              value={title}
              onChange={this.handlerAdderOfTitle}
              placeholder="Enter the title"
            />
            <button
              type="submit"
              className="form__button"
            >
              Add todo
            </button>
          </form>
        </div>
        <div className="paragraph">
          <div className="paragraph__user-block">
            {
              isUserSelected && (
                <p className="paragraph__user--error">
                  *Please choose a user
                </p>
              )
            }
          </div>
          <div className="paragraph__title-block">
            {
              isTitleAdded
                ? (
                  <p className="paragraph__title--error">
                    *Please enter the title
                  </p>
                )
                : (
                  <p
                    className={classNames('paragraph__title', { paragraph__title_active: moreThanMaxLength })}
                  >
                    {`Max length of title is ${maxLengthOfTitle} symbols`}
                  </p>
                )
            }
          </div>
        </div>
        <div className="App__table">
          <TodoList todos={currentTodos} />
        </div>
      </div>
    );
  }
}

export default App;
