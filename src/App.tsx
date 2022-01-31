import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './Components/TodoList/TodoList';

export const getUserById = (userId: number) => users.find(
  (user) => user.id === userId,
);

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: getUserById(todo.userId) || null,
}));

type State = {
  todosList: Todo[],
  todoTitle: string,
  selectedUserId: number,
  titleError: boolean,
  userError: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    todosList: [...preparedTodos],
    todoTitle: '',
    selectedUserId: 0,
    titleError: false,
    userError: false,
  };

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoTitle: event.target.value,
      titleError: false,
    });
  };

  handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUserId: +event.target.value,
      userError: false,
    });
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.formValidation()) {
      this.addTodo();
      this.clearState();
    }
  };

  addTodo = () => {
    const { todosList, todoTitle, selectedUserId } = this.state;

    const newTodo: Todo = {
      id: todosList.length + 1,
      title: todoTitle,
      userId: selectedUserId,
      completed: false,
      user: getUserById(selectedUserId) || null,
    };

    this.setState(state => ({
      todosList: [...state.todosList, newTodo],
    }));
  };

  clearState = () => {
    this.setState({
      todoTitle: '',
      selectedUserId: 0,
    });
  };

  formValidation = () => {
    const { todoTitle, selectedUserId } = this.state;

    if (!todoTitle || !selectedUserId) {
      this.setState({
        titleError: !todoTitle,
        userError: !selectedUserId,
      });

      return false;
    }

    return true;
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.handleSubmit}>
          <fieldset className="form">
            <section>
              <input
                type="text"
                value={this.state.todoTitle}
                onChange={this.handleChangeTitle}
                className="form__title-input"
              />
              {this.state.titleError && (
                <p>Enter the title</p>
              )}
            </section>

            <section>
              <select
                value={this.state.selectedUserId}
                onChange={this.handleChangeUser}
                className="form__user-select"
              >
                <option value="">Choose a user</option>
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
              {this.state.userError && (
                <p>Choose a user</p>
              )}
            </section>

            <button type="submit">
              Add
            </button>
          </fieldset>
        </form>
        <TodoList todos={this.state.todosList} />
      </div>
    );
  }
}

export default App;
