import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

type State = {
  todos: Todo[];
  title: string;
  userId: number;
  titleError: boolean;
  userError: boolean;
};

const preparedTodosFromServer: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

class App extends React.Component<{}, State> {
  state = {
    todos: preparedTodosFromServer,
    title: '',
    userId: 0,
    titleError: false,
    userError: false,
    maxLength: 25,
  };

  addTodo = (event: React.FormEvent) => {
    const {
      title,
      userId,
      maxLength,
    } = this.state;

    event.preventDefault();

    this.validate();

    if (title.trim() && userId && title.length <= maxLength) {
      const currentUser = users.find(user => userId === user.id);

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

      this.clearData();
    }
  };

  validate = () => {
    const { userId, title } = this.state;

    if (!userId) {
      this.setState({ userError: true });
    }

    if (!title.trim()) {
      this.setState({ titleError: true });
    }
  };

  clearData = () => {
    this.setState({ userId: 0 });
    this.setState({ title: '' });
  };

  render() {
    const currentTodos = [...this.state.todos];
    const {
      title,
      userId,
      titleError,
      userError,
      maxLength,
    } = this.state;

    return (
      <div className="App">
        <h2>Add a task</h2>
        <div className="Form__wrapper">
          <form
            onSubmit={this.addTodo}
            className="Form"
          >
            <div className="Form__itemBlock">
              <input
                type="text"
                placeholder="title"
                value={title}
                className="Form__item"
                onChange={(event) => {
                  this.setState({ title: event.target.value, userError: false });
                }}
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
                <option key={0} value={0}>Please chose a user</option>
                {users.map((user, index) => (
                  <option key={`${user.id}__${index + 1}`} value={user.id}>{user.name}</option>
                ))}
              </select>
              {userError
              && <span className="Error">Please, select a user</span>}
            </div>
            <button
              type="submit"
              className="Form__item"
            >
              Add
            </button>
          </form>
        </div>
        <TodoList preparedTodos={currentTodos} />
      </div>
    );
  }
}

export default App;
