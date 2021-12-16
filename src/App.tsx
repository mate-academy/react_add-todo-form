import React, { Component } from 'react';
import { TodoList } from './components/TodoList';
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
  newUser: number;
  error: string;
  // maxLength: number
}

class App extends Component<{}, State> {
  state: State = {
    printTodos: [...preparedTodos],
    newTodoName: '',
    newUser: 0,
    error: '',
  };

  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { newUser, newTodoName } = this.state;

    if (newTodoName === '') {
      this.setState({
        error: 'Please enter the title',
      });
    } else if (newUser === 0) {
      this.setState({
        error: 'Please choose a user',
      });
    } else {
      this.setState({ error: '' });
      this.addTodo();
      this.setState({ newTodoName: '', newUser: 0 });
    }
  };

  addTodo = () => {
    const { printTodos, newUser, newTodoName } = this.state;
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
    const res = pattern.test(event.target.value);

    if (res) {
      this.setState({
        newTodoName: event.target.value,
        error: '',
      });
    }
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newUser: Number(event.target.value),
      error: '',
    });
  };

  render() {
    const {
      printTodos, newTodoName, newUser, error,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>
        <form name="newTodo" onSubmit={(e) => this.handleSubmit(e)}>
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
        <p className="App__err">{`${error}`}</p>
        <TodoList todos={printTodos} />
      </div>
    );
  }
}
export default App;
