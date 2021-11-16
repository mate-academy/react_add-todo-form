import React from 'react';
import './App.scss';
import { TodoList, Todo } from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

export interface State {
  todos: Todo[],
  user: string,
  title: string,
  hasTitleError: boolean,
  hasUserError: boolean,
}

export class App extends React.Component {
  state: State = {
    todos: [...todos],
    user: '',
    title: '',
    hasTitleError: false,
    hasUserError: false,
  };

  handleUserChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      hasUserError: false,

    });
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;


    this.setState({
      [name]: value,
      hasTitleError: false,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.checkError();

    const { user, title } = this.state;

    if (user && title) {
      this.addTodo();

      this.setState({ user: '', title: '' });
    }
  };

  addTodo = () => {
    this.setState((prevstate: State) => {
      let userId;
      const person = users.find(user => user.name === this.state.user);

      if (person) {
        userId = person.id;
      } else {
        userId = 0;
      }

      const newTodo: Todo = {
        userId,
        id: prevstate.todos.length + 1,
        title: this.state.title,
        completed: false,
      };

      return { todos: [...prevstate.todos, newTodo] };
    });
  };

  checkError = () => {
    this.setState((prevState: State) => {
      const { title, user } = prevState;

      return {
        hasTitleError: !title,
        hasUserError: !user,
      };
    });
  };

  render() {
    const {
      title, hasTitleError, hasUserError,
    } = this.state;

    return (
      <div className="App">
        <form
          onSubmit={this.handleSubmit}
          className="form"
        >
          <label htmlFor="todoTitle">
            Add todo:
            <input
              type="text"
              name="title"
              id="todoTitle"
              value={title}
              onChange={this.handleTitleChange}
              placeholder="enter todo title"
            />
            {hasTitleError && <div>Please enter the title</div>}
          </label>

          <label htmlFor="UserSelection">
            Assign to:
            <select
              name="user"
              id="UserSelection"
              value={this.state.user}
              onChange={this.handleUserChange}
            >
              <option value="">
                choose a person
              </option>
              {users.map(user => (
                <option value={user.name} key={user.name}>{user.name}</option>
              ))}
            </select>
            {hasUserError && <div>Please choose a user</div>}
          </label>

          <button
            type="submit"
            className="button"
            onClick={this.checkError}
          >
            ADD
          </button>
        </form>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
