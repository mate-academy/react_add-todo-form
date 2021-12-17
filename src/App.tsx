import React, { Component } from 'react';
import TodoList from './components/TodoList';
import { Todo } from './components/types/Todo';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

const preparedTodos: Todo[] = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId),
  };
});

interface State {
  printTodos: Todo[];
  newTodoName: string;
  newUserId: number;
  error: string;
}

class App extends Component<{}, State> {
  state: State = {
    printTodos: [...preparedTodos],
    newTodoName: '',
    newUserId: 0,
    error: '',
  };

  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.handleValidation();
  };

  handleValidation = () => {
    const { newTodoName, newUserId, error } = this.state;

    const todoError = newTodoName
      ? ''
      : 'Title is required';
    const userError = newUserId
      ? ''
      : 'User is required';

    const isValid = !todoError && !userError;

    if (isValid) {
      this.addTodo();
      this.setState({ newTodoName: '', newUserId: 0 });
    } else {
      this.setState({
        error: todoError || userError,
      });
    }

    return error;
  };

  addTodo = () => {
    const { printTodos, newUserId: newUser, newTodoName } = this.state;
    const createdTodo: Todo = {
      title: newTodoName,
      userId: newUser,
      completed: false,
      id: printTodos.length + 1,
      user: users.find(user => user.id === newUser),
    };

    this.setState(currentState => ({
      printTodos: [
        ...currentState.printTodos,
        createdTodo,
      ],
    }));
  };

  handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pattern = /^[a-zA-Zа-яА-ЯіІ0-9\s]*$/;
    const validationResult = pattern.test(event.target.value);

    if (validationResult) {
      this.setState({
        newTodoName: event.target.value,
        error: '',
      });
    }
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newUserId: Number(event.target.value),
      error: '',
    });
  };

  render() {
    const {
      printTodos, newTodoName, newUserId: newUser, error,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>
        <form name="newTodo" onSubmit={(e) => this.handleSubmit(e)}>
          <p className="App__err">{error && error}</p>
          <input
            type="text"
            name="newTodoName"
            onChange={this.handleTodoChange}
            value={newTodoName}
            placeholder="to do"
            className="App__input"
          />
          <select
            value={newUser}
            onChange={this.handleUserChange}
            name="newUser"
            className="App__select"
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {users.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
          <button type="submit" className="App__btn">
            Add
          </button>
        </form>
        <TodoList todos={printTodos} />
      </div>
    );
  }
}
export default App;
