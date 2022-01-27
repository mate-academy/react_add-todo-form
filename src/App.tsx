import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';

type State = {
  name: string;
  title: string;
  invalidTitle: boolean;
  invalidName: boolean;
  todosFromServer: TodosFromServer[];
};

class App extends React.Component<Props, State> {
  state: State = {
    name: '',
    title: '',
    invalidTitle: false,
    invalidName: false,
    todosFromServer: [...todos],
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

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.formValidation()) {
      this.addNewTodo();
      this.clearState();
    }
  };

  usersWithTodos = () => {
    const prepareTodos: Todo[] = this.state.todosFromServer.map(todo => ({
      ...todo,
      user: users.find(user => todo.userId === user.id) || null,
    }));

    return prepareTodos;
  };

  addNewTodo = () => {
    const { title, name } = this.state;
    const person = users.find(user => user.name === name) || null;
    const newTodo: TodosFromServer = {
      userId: person?.id,
      id: Math.random(),
      title,
      completed: false,
    };

    this.setState(state => ({
      todosFromServer: [...state.todosFromServer, newTodo],
    }));
  };

  clearState = () => {
    this.setState({
      title: '',
      name: '',
      invalidTitle: false,
      invalidName: false,
    });
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

  render(): React.ReactNode {
    const {
      title,
      name,
      invalidTitle,
      invalidName,
    } = this.state;
    const prepareTodos = this.usersWithTodos();

    return (
      <div className="App">
        <h1>
          Add todo form
        </h1>

        <form onSubmit={this.handleSubmit}>
          <section>
            <input
              className="Title"
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={this.handleChangeTitle}
            />
            <br />
            {invalidTitle
              && <span>Please enter a title</span>}
          </section>

          <section>
            <select
              className="Select-name"
              value={name}
              onChange={this.handleNameSelect}
            >
              <option value="">
                Choose a user
              </option>
              {users.map((user) => (
                <option key={user.id} value={user.name}>
                  {user.name}
                </option>
              ))}
            </select>
            <br />
            {invalidName
              && <span>Please choose a name</span>}
          </section>

          <button
            type="submit"
            className="Button"
          >
            Add
          </button>
        </form>

        <div>
          <TodoList todos={prepareTodos} />
        </div>
      </div>
    );
  }
}

export default App;
