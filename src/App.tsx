import React from 'react';
import './App.scss';
import { TodoList } from './TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';

const preparedTodos = todos.map(item => ({
  ...item,
  user: users.find(person => item.userId === person.id) || null,
}));

type State = {
  user: string,
  title: string,
  todos: Todo[],
  userError: boolean,
  titleError: boolean,
};

class App extends React.Component<{}, State> {
  state = {
    user: '',
    title: '',
    todos: preparedTodos,
    userError: false,
    titleError: false,
  };

  addTodo = () => {
    if (!this.state.user.length) {
      this.setState((state) => ({
        userError: !state.userError,
      }));

      return;
    }

    if (!this.state.title.length) {
      this.setState((state) => ({
        titleError: !state.titleError,
      }));

      return;
    }

    const currentUser = users.find(user => user.name === this.state.user);

    const newIdNumberForNewTodo = () => {
      let max = 0;

      for (let i = 0; i < this.state.todos.length; i += 1) {
        max = Math.max(this.state.todos[i].id);
      }

      return Number(max + 1);
    };

    const newTodo = {
      userId: currentUser?.id,
      id: newIdNumberForNewTodo(),
      title: this.state.title,
      completed: false,
      user: currentUser || null,
    };

    this.setState((state) => ({
      todos: [...state.todos, newTodo],
      title: '',
      user: '',
    }));
  };

  deleteTodo = (todoId: number) => {
    this.setState((state) => ({
      todos: [...state.todos].filter(todo => todo.id !== todoId),
    }));
  };

  render() {
    const { userError, titleError } = this.state;

    return (
      <div className="app">
        <h1 className="app__title">List of Todos</h1>
        <TodoList preparedTodos={this.state.todos} deleteTodo={this.deleteTodo} />

        <form className="form">
          <h1 className="form__title">Add todo form</h1>
          <div className="form__row">
            <select
              className="form__input form__input--textarea"
              value={this.state.user}
              onChange={(event) => {
                this.setState(() => ({
                  user: event.target.value,
                  userError: false,
                }));
              }}
            >
              <option value="" disabled>Choose mentor</option>
              {users.map(user => (
                <option key={user.id}>{user.name}</option>
              ))}
            </select>
            {userError && <p className="form__error">Need to select mentor from list</p>}
          </div>
          <div className="form__row">
            <input
              placeholder="Title - max 50 chars"
              className="form__input"
              maxLength={50}
              value={this.state.title}
              onChange={(event) => {
                this.setState(() => ({
                  title: event.target.value,
                  titleError: false,
                }));
              }}
            />
            {titleError && <p className="form__error">Need to type title</p>}
          </div>
          <button
            className="form__btn"
            type="button"
            onClick={this.addTodo}
          >
            Add todo
          </button>
        </form>

      </div>
    );
  }
}

export default App;
