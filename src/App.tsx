import React from 'react';
import { TodoList } from './TodoList';

import './App.scss';

import users from './api/users';
import todos from './api/todos';

const todosList: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(u => u.id === todo.userId) || null,
}));

type State = {
  todosNew: Todo[];
  newTodoName: string;
  selectedWhat: number;
  todos2: string;
  hasTitlerror: boolean;
  hasSelectorError: boolean;
};

export class App extends React.Component<{}, State> {
  state: State = {
    todosNew: [...todosList],
    newTodoName: '',
    selectedWhat: 0,
    todos2: '',
    hasTitlerror: false,
    hasSelectorError: false,
  };

  handleChangeNewtodoName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodoName: event.target.value,
    });
  };

  handleSelector = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedWhat: +event.target.value,
    });
  };

  clearState = () => {
    this.setState({
      newTodoName: '',
      selectedWhat: 0,
      todos2: '',
    });
  };

  addNewTodosInArr = (newTodos: Todo) => {
    this.setState(prevState => ({
      todosNew: [...prevState.todosNew, newTodos],
    }));
  };

  validateForm = () => {
    const { newTodoName, selectedWhat } = this.state;

    if (!newTodoName || !selectedWhat) {
      this.setState({
        hasTitlerror: !newTodoName,
        hasSelectorError: !selectedWhat,
      });

      return false;
    }

    return true;
  };

  getNewTodo = () => {
    const { todos2, newTodoName, selectedWhat } = this.state;

    return {
      userId: selectedWhat,
      id: todos2.length + 1,
      title: newTodoName,
      completed: false,
      user: users.find(e => e.id === selectedWhat) || null,
    };
  };

  handlerPreventDefault = (event: React.FormEvent) => {
    event.preventDefault();

    const isFormValid = this.validateForm();

    if (isFormValid) {
      const newTod = this.getNewTodo();

      this.addNewTodosInArr(newTod);
      this.clearState();

      // eslint-disable-next-line no-console
      console.log(newTod);
    }
  };

  render() {
    const
      {
        todosNew,
        newTodoName,
        selectedWhat,
        hasTitlerror,
        hasSelectorError,
      } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.handlerPreventDefault}>
          <button type="submit">Add</button>
          <>
            <label
              htmlFor="title"
              className="label"
            >
              {' '}
            </label>
            <section>
              <input
                type="text"
                id="title"
                value={newTodoName}
                onChange={this.handleChangeNewtodoName}
                className="input"
                placeholder="Type some words"
              />
              {hasTitlerror && (
                <span>Please, enter text</span>
              )}
            </section>

            <section>
              <select
                value={selectedWhat}
                onChange={this.handleSelector}
              >
                <option value="0">Choose a user</option>
                {users.map(person => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
              {hasSelectorError && (
                <span>Please select name</span>
              )}
            </section>
          </>
        </form>
        <TodoList props={todosNew} />
      </div>
    );
  }
}
