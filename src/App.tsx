import React from 'react';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { NewTodo, State } from './type/Types';

const newTodos: NewTodo[] = todosFromServer.map(todo => (
  {
    user: usersFromServer.find(user => (user.id === todo.userId)) || null,
    ...todo,
  }
));

class App extends React.Component<{}, State> {
  state: State = {
    todos: newTodos,
    newTodoName: '',
    newTodoPerformer: 0,
    isTodoNameEmpty: false,
    isTodoPerformerEmpty: false,
  };

  clickOnTodos = () => {
    this.setState({ isTodoNameEmpty: false });
  };

  clickOnPerformer = () => {
    this.setState({ isTodoPerformerEmpty: false });
  };

  inputTodoName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ newTodoName: event.target.value });
  };

  inputTodoPerformer = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newTodoPerformer:
        usersFromServer.find(user => user.id === +event.target.value)?.id
        || -1,
    });
  };

  addInTodoList = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!this.state.newTodoName
        || !this.state.newTodoPerformer
        || this.state.newTodoPerformer === -1) {
      if (!this.state.newTodoName) {
        this.setState({ isTodoNameEmpty: true });
      }

      if (!this.state.newTodoPerformer
          || this.state.newTodoPerformer === -1) {
        this.setState({ isTodoPerformerEmpty: true });
      }

      return;
    }

    const maxTodoId = Math.max(...this.state.todos.map(todo => todo.id));

    const newTodo: NewTodo = {
      userId: +this.state.newTodoPerformer,
      id: maxTodoId + 1,
      title: this.state.newTodoName,
      completed: false,
      user: usersFromServer.find(user => user.id === +this.state.newTodoPerformer) || null,
    };

    this.setState(prev => {
      return {
        newTodoName: '',
        newTodoPerformer: 0,
        todos: [
          newTodo,
          ...prev.todos,
        ],
      };
    });
  };

  render() {
    const {
      todos,
      newTodoName,
      newTodoPerformer,
      isTodoNameEmpty,
      isTodoPerformerEmpty,
    } = this.state;

    return (
      <div className="App">
        <h1>List of todos</h1>

        <form
          className="form"
          onSubmit={this.addInTodoList}
        >
          <input
            className={
              (!isTodoNameEmpty)
                ? 'form__element'
                : 'form__element alarm'
            }
            type="text"
            placeholder="Enter todo"
            onClick={this.clickOnTodos}
            onChange={this.inputTodoName}
            value={!isTodoNameEmpty ? newTodoName : 'Please enter todo'}
          />

          <select
            className={
              (!isTodoPerformerEmpty)
                ? 'form__element'
                : 'form__element alarm'
            }
            name="users"
            id="users"
            value={newTodoPerformer}
            onClick={this.clickOnPerformer}
            onChange={this.inputTodoPerformer}
          >
            <option value="0">Select performer</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          <button
            className="form__element"
            type="submit"
          >
            Add new todo to list
          </button>
        </form>

        <table className="table">
          <thead>
            <tr>
              <th className="tableHeader__line">Title</th>
              <th className="tableHeader__line">Status</th>
              <th className="tableHeader__line">Name</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.id}>
                <th className="tableBody__line">{todo.title}</th>
                {todo.completed
                  ? <th className="tableBody__line">Done</th>
                  : <th className="tableBody__line">To perform</th>}
                {todo.user
                  ? <th className="tableBody__line">{todo.user.name}</th>
                  : <th className="tableBody__line">No performer</th>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
