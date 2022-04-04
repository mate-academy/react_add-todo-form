import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';

type State = {
  title: string,
  name: string,
  allTodos: allTodos[],
  titleError: boolean,
  userError: boolean,
};

export class App extends React.Component<{}, State> {
  state: State = {
    title: '',
    name: '',
    allTodos: todos,
    titleError: false,
    userError: false,
  };

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      titleError: false,
    });
  };

  addNewTodo = (newTodo: Todo) => {
    this.setState((state) => ({
      allTodos: [...state.allTodos, newTodo],
    }));
  };

  handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      name: event.target.value,
      userError: false,
    });
  };

  addTodo = () => {
    const { title, name, allTodos } = this.state;
    const user = users.find(person => person.name === name) || null;

    const newTodo: allTodos = {
      userId: user?.id,
      id: allTodos.length + 1,
      title,
      completed: false,
    };

    this.setState(state => ({
      allTodos: [...state.allTodos, newTodo],
    }));
  };

  formValidation = () => {
    const { name, title } = this.state;

    if (!name || !title) {
      this.setState({
        userError: !name,
        titleError: !title,
      });

      return false;
    }

    return true;
  };

  clearState = () => {
    this.setState({
      title: '',
      name: '',
      titleError: false,
      userError: false,
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
    const preparedTodos: Todo[] = this.state.allTodos.map(todo => ({
      ...todo,
      user: users.find(user => todo.userId === user.id) || null,
    }));

    return preparedTodos;
  };

  render() {
    const {
      title,
      name,
      titleError,
      userError,
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
              className="form-control"
            />
            <br />
            {titleError && <span>Please enter a title</span>}
            <br />

            <select
              name="users"
              value={name}
              onChange={this.handleUserSelect}
              className="form-select form-select-lg mb-3"
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
            {userError && <span>Please choose a name</span>}
            <br />

            <button type="submit" className="btn btn-primary btn-lg">
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
