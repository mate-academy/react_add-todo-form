import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';

import users from './api/users';
import todos from './api/todos';
import { User } from './components/types/User';

type State = {
  newTodos: Todo [];
  title: string;
  newUser: string;
  titleError: string | null;
  newUserError: string | null;
};

const preparedTodos = todos.map(todo => {
  return {
    ...todo,
    user: users.find(person => person.id === todo.userId),
  };
});

class App extends React.Component<{}, State> {
  state: State = {
    newTodos: [...preparedTodos],
    title: '',
    newUser: '',
    titleError: null,
    newUserError: null,
  };

  addTodo = (state: State, user: User) => ({
    newTodos: [...state.newTodos,
      {
        id: state.newTodos.length + 1,
        title: state.title,
        userId: user.id,
        user,
      },
    ],
    titleError: null,
    newUserError: null,
  });

  errorChange = () => {
    const { title, newUser } = this.state;
    const titleError = title
      ? null
      : 'Please choose a title';
    const newUserError = newUser
      ? null
      : 'Please enter the user';

    this.setState({
      titleError,
      newUserError,
    });

    return !titleError && !newUserError;
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const getUser: User | undefined = users.find(({ name }) => name === this.state.newUser);
    const isValid = this.errorChange() && getUser;

    if (isValid) {
      this.setState(state => (
        this.addTodo(state, getUser)
      ));

      this.setState({
        title: '',
        newUser: '',
      });
    }
  };

  handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    this.setState({
      title: value,
    });
  };

  handleChangeUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    this.setState({
      newUser: value,
    });
  };

  render() {
    const {
      newTodos, title, newUser, titleError, newUserError,
    } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>
        <form
          className="App__form form"
          onSubmit={this.handleSubmit}
          name="newTodo"
        >
          <div className="form__title">
            <input
              type="text"
              placeholder="Enter your title"
              value={title}
              name="newTodoTitle"
              className="form__field"
              onChange={this.handleChangeTitle}
            />
            {(titleError && !title) && <span className="form__error form__field">{titleError}</span>}
          </div>
          <div className="form__user">
            <select
              name="userName"
              value={newUser}
              className="form__field"
              onChange={this.handleChangeUser}
            >
              <option value="" disabled selected>Choose User</option>
              {users.map(({ name, id }) => (
                <option value={name} key={id}>{name}</option>
              ))}
            </select>
            {(newUserError && !newUser) && <span className="form__error form__field">{newUserError}</span>}
          </div>
          <button type="submit" className="form__button form__field">Add</button>
        </form>
        <TodoList todos={newTodos} />
      </div>
    );
  }
}

export default App;
