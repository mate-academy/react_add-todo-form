/* eslint-disable no-console */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList/TodoList';
import { PreparedTodo } from './type/preparedtodo';

import todos from './api/todos';
import users from './api/users';
import { Todo } from './type/todo';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

type State = {
  todosArr: PreparedTodo[],
  userId: Todo['userId'],
  title: Todo['title'],
  userIdErrorMessage: string,
  titleErrorMessage: string,
};

class App extends React.Component<{}, State> {
  validForm = true;

  state: State = {
    todosArr: preparedTodos,
    userId: 0,
    title: '',
    userIdErrorMessage: '',
    titleErrorMessage: '',
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ userId: Number(event.target.value), userIdErrorMessage: '' });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: event.target.value, titleErrorMessage: '' });
  };

  validateTitle = (title: Todo['title']) => {
    let validForm = true;

    if (title === '') {
      this.setState({ titleErrorMessage: 'Title todo should be not empty' });
      validForm = false;

      return this.validForm;
    }

    const pattern = /[\p{Script=Latin}\p{Script=Cyrillic}\p{Number}\p{Space_Separator}]/ug;
    const matches = Array.from(title.matchAll(pattern)).join('');

    if (title === matches) {
      this.setState({ titleErrorMessage: '' });
      validForm = true;
    } else {
      const notMathes = Array.from(title).filter(ch => !matches.includes(ch)).join('');

      this.setState({ title: matches, titleErrorMessage: `This characters ${notMathes} are invalid` });
      validForm = false;
    }

    return validForm;
  };

  validateUser = (userId: number) => {
    let validForm = true;

    if (userId === 0) {
      this.setState({ userIdErrorMessage: 'Please choose a user' });
      validForm = false;
    } else {
      this.setState({ userIdErrorMessage: '' });
      validForm = true;
    }

    return validForm;
  };

  addTodo = (title: string, userId: number) => {
    this.setState(prevState => {
      const newTodo: PreparedTodo = {
        userId: Number(userId),
        id: this.state.todosArr.length + 1,
        title,
        completed: false,
        user: users.find(user => user.id === userId),
      };

      return {
        todosArr: [...prevState.todosArr, newTodo],
      };
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, userId } = this.state;

    if (this.validateTitle(title) && this.validateUser(userId)) {
      this.addTodo(title, userId);
      this.setState({
        title: '', userId: 0, titleErrorMessage: '', userIdErrorMessage: '',
      });
    }
  };

  render() {
    const {
      todosArr, userId, title, userIdErrorMessage, titleErrorMessage,
    } = this.state;

    return (
      <div className="App">
        <TodoList prepared={todosArr} />
        <h1>Add todo form</h1>
        <form onSubmit={this.handleSubmit} className="todo-list">
          <div className="todo__item">
            <input
              type="text"
              name="title"
              placeholder="Enter a title"
              value={title}
              onChange={this.handleInputChange}
              className="todo__item input"
            />
            {titleErrorMessage
              && (
                <div className="error">
                  {titleErrorMessage}
                </div>
              )}
          </div>

          <div className="todo__item">
            <select
              title="user"
              id="user"
              name="user"
              value={userId}
              onChange={this.handleSelectChange}
              className="todo__item select"
            >
              <option value="" className="todo__item option">
                Choose a user
              </option>
              {users
                .map(user => (
                  <option
                    className="todo__item option"
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))}
            </select>
            {userIdErrorMessage
            && (
              <div className="error">
                {userIdErrorMessage}
              </div>
            )}
          </div>

          <div className="todo__item">
            <button
              type="submit"
              name="submit"
              className="todo__item button"
            >
              Add todo
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
