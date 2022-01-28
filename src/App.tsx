import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import users from './api/users';
import todos from './api/todos';

type State = {
  selectedUser: number,
  newTodoDescription: string,
  todo: Todo[],
  hasTodoError: boolean,
  hasUserError: boolean,
};

type Props = {};

const preparedTodos: Todo[] = todos.map((todo) => ({
  ...todo,
  user: users.find(u => u.id === todo.userId) || null,
}));

class App extends React.Component<Props, State> {
  state: State = {
    selectedUser: 0,
    newTodoDescription: '',
    todo: [...preparedTodos],
    hasTodoError: false,
    hasUserError: false,
  };

  clearState = () => {
    this.setState({
      selectedUser: 0,
      newTodoDescription: '',
      hasTodoError: false,
      hasUserError: false,
    });
  };

  handleTodoDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodoDescription: event.target.value,
      hasTodoError: false,
    });
  };

  handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUser: +event.target.value,
      hasUserError: false,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { todo, newTodoDescription, selectedUser } = this.state;

    if (!newTodoDescription || !selectedUser) {
      this.setState({
        hasTodoError: !newTodoDescription,
        hasUserError: !selectedUser,
      });

      return;
    }

    const newTodo: Todo = {
      userId: selectedUser,
      id: todo.length + 1,
      title: newTodoDescription,
      completed: false,
      user: users.find(u => u.id === selectedUser) || null,
    };

    this.setState((prevState) => ({
      todo: [...prevState.todo, newTodo],
    }));

    this.clearState();
  };

  render() {
    const {
      hasUserError,
      hasTodoError,
      todo,
      newTodoDescription,
      selectedUser,
    } = this.state;

    return (
      <div className="App">
        <h1 className="page__title-todo">Add todo form</h1>
        <form
          className="form__todo"
          onSubmit={this.handleSubmit}
        >
          <section>
            <input
              className="input is-normal is-primary form__todo__input"
              type="text"
              value={newTodoDescription}
              placeholder="Write your task"
              onChange={this.handleTodoDescription}
            />
            {hasTodoError && (
              <span className="form__msg-err">Please enter the title</span>
            )}
          </section>

          <section className="is-normal select is-primary">
            <select
              className="form__todo__select"
              value={selectedUser}
              onChange={this.handleChangeUser}
            >
              <option value="0">Choose a user</option>
              {users.map((value) => (
                <option key={value.id} value={value.id}>{value.name}</option>
              ))}
            </select>
          </section>
          {hasUserError && (
            <span className="form__msg-err">Please choose a user</span>
          )}
          <button
            type="submit"
            className="button is-primary is-normal form__todo__button"
          >
            Add todo
          </button>
        </form>
        <span className="page__title-users">Tasks </span>
        <TodoList todos={todo} />
      </div>
    );
  }
}

export default App;
