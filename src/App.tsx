/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import users from './api/users';
import todos from './api/todos';
import { PreparedTodos } from './types/PreparedTodos';

type State = {
  todos: PreparedTodos[];
  title: string;
  userId: number;
  titleError: boolean;
  userError: boolean;
};

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

class App extends React.Component<{}, State> {
  state = {
    todos: preparedTodos,
    title: '',
    userId: 0,
    titleError: false,
    userError: false,
    maxLength: 35,
  };

  addTodo = (event: React.FormEvent) => {
    const {
      title,
      userId,
      maxLength,
    } = this.state;

    event.preventDefault();

    if (!title.trim()) {
      this.setState({ titleError: true });
    }

    if (!userId) {
      this.setState({ userError: true });
    }

    if (title.trim() && userId && title.length <= maxLength) {
      const currentUser = users.find(user => user.id === userId);

      const newTodo = {
        userId,
        id: Math.max(...(this.state.todos.map(todo => todo.id))) + 1,
        title,
        completed: false,
        user: currentUser || null,
      };

      this.setState((state) => ({
        todos: [...state.todos, newTodo],
      }));

      this.state.title = '';
      this.state.userId = 0;
    }
  };

  render() {
    const todosFinal = [...this.state.todos];
    const {
      title,
      userId,
      titleError,
      userError,
      maxLength,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <div className="Form__wrapper">
          <form
            onSubmit={this.addTodo}
            className="Form"
          >
            <div className="Form__itemBlock">
              <input
                placeholder="Please enter a title"
                type="text"
                value={title}
                onChange={(event) => {
                  this.setState({ title: event.target.value, titleError: false });
                }}
                className="Form__item"
              />
              {titleError && <span className="Error">Please enter the title</span>}
              {title.length > maxLength && <span className="Error">Title length should be no more than 35 characters</span>}
            </div>
            <div className="Form__itemBlock">
              <select
                value={userId}
                onChange={(event) => (
                  this.setState({ userId: +event.target.value, userError: false }))}
                className="Form__item"
              >
                <option key={0} value={0}>Please choose a user</option>
                {users.map((user, index) => (
                  <option
                    key={`${user.id}__${index + 100}`}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>
              {userError && <span className="Error">Please, choose a user</span>}
            </div>
            <button
              type="submit"
              className="Form__item"
            >
              Add
            </button>
          </form>
        </div>
        <TodoList todos={todosFinal} />
      </div>
    );
  }
}

export default App;
