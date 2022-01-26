import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './Components/TodoList';

export class App extends React.Component<{}, State> {
  state: State = {
    title: '',
    name: '',
    todosFromServer: todos,
    invalidTitle: false,
    invalidName: false,
  };

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      invalidTitle: false,
    });
  };

  handleNameSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      name: event.target.value,
      invalidName: false,
    });
  };

  addTodo = () => {
    const { title, name, todosFromServer } = this.state;
    const user = users.find(person => person.name === name) || null;
    const newTodo: TodosFromServer = {
      userId: user?.id,
      id: todosFromServer.length + 1,
      title,
      completed: false,
    };

    this.setState(state => ({
      todosFromServer: [...state.todosFromServer, newTodo],
    }));
  };

  formValidation = () => {
    const { name, title } = this.state;

    if (!name || !title) {
      this.setState({
        invalidTitle: !title,
        invalidName: !name,
      });

      return false;
    }

    return true;
  };

  clearState = () => {
    this.setState({
      title: '',
      name: '',
      invalidTitle: false,
      invalidName: false,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.formValidation()) {
      this.addTodo();
      this.clearState();
    }
  };

  prepareTodos = () => {
    const preparedTodos: Todo[] = this.state.todosFromServer.map(todo => ({
      ...todo,
      user: users.find(user => todo.userId === user.id) || null,
    }));

    return preparedTodos;
  };

  render() {
    const {
      name,
      title,
      invalidTitle,
      invalidName,
    } = this.state;
    const preparedTodos = this.prepareTodos();

    return (
      <div className="App">
        <h1 className="title">Add todo form</h1>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={this.handleChangeTitle}
            />
            <br />
            {invalidTitle && <span>Please enter a title</span>}
            <br />

            <select
              name="users"
              value={name}
              onChange={this.handleNameSelect}
            >
              <option value="">
                Choose a user
              </option>
              {users.map(user => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
            <br />
            {invalidName && <span>Please choose a name</span>}
            <br />

            <button
              type="submit"
              className="button"
            >
              Add
            </button>
          </form>
        </div>
        <br />
        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}

export default App;
