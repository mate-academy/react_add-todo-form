import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './component/TodoList';

type State = {
  name: string;
  title: string;
  invalidTitle: boolean;
  invalidName: boolean;
  todosFromServer: TodosFromServer[];
};

class App extends React.Component<{}, State> {
  state: State = {
    name: '',
    title: '',
    invalidTitle: false,
    invalidName: false,
    todosFromServer: [...todos],
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
        <div className="page">
          <div>
            <h1>
              Add task
            </h1>

            <form onSubmit={this.handleSubmit}>
              <section>
                {invalidTitle
                  && <span>Please enter a title</span>}
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  placeholder="Add task"
                  value={title}
                  onChange={this.handleChangeTitle}
                />
                <br />
              </section>

              <section>
                {invalidName
                  && <span>Please choose a name</span>}
                <select
                  className="form-select todoUser"
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
              </section>

              <button
                type="submit"
                className="btn btn-primary"
              >
                Add
              </button>
            </form>
          </div>
          <div>
            <TodoList todos={prepareTodos} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
