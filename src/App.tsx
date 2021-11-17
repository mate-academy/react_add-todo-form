import React from 'react';
import './App.scss';
import { TodoList } from './components';
import todos from './api/todos';
import users from './api/users';
import { Todo } from './components/types';

type Props = {};

interface State {
  allTodos: Todo[],
  titleTodo: string,
  selectedUserId: number,
  hasTodoError: boolean,
  hasUserError: boolean,
}

class App extends React.Component<Props, State> {
  state: State = {
    allTodos: [...todos],
    titleTodo: '',
    selectedUserId: 0,
    hasTodoError: false,
    hasUserError: false,
  };

  addTodo = () => {
    this.setState(state => {
      const { allTodos, selectedUserId, titleTodo } = state;

      const newTodo = {
        userId: selectedUserId,
        id: allTodos.length + 1,
        title: titleTodo,
        completed: false,
        user: users.find(user => user.id === selectedUserId),
      };

      return { allTodos: [...allTodos, newTodo] };
    });
  };

  changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      titleTodo: event.target.value,
      hasTodoError: false,
    });
  };

  changeUserHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUserId: +event.target.value,
      hasUserError: false,
    });
  };

  checkError = () => {
    this.setState((state) => {
      return {
        hasTodoError: !state.titleTodo,
        hasUserError: !state.selectedUserId,
      };
    });
  };

  submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.checkError();
    const { titleTodo, selectedUserId } = this.state;

    if (titleTodo && selectedUserId) {
      this.addTodo();

      this.setState({
        titleTodo: '',
        selectedUserId: 0,
      });
    }
  };

  render() {
    const {
      titleTodo, allTodos, selectedUserId, hasTodoError, hasUserError,
    } = this.state;

    return (
      <div className="app">
        <h1>Add todo form</h1>
        <form
          action=""
          method="post"
          onSubmit={this.submitHandler}
        >
          <label htmlFor="titleTodo" className="app__input">
            <input
              type="text"
              name="todo"
              id="titleTodo"
              value={titleTodo}
              onChange={this.changeTitleHandler}
              placeholder="todo"
            />
            {hasTodoError && <p className="app__error">Add todo please</p>}
          </label>
          <div className="app__select">
            <select
              name="user"
              id=""
              value={selectedUserId}
              onChange={this.changeUserHandler}
            >
              <option value="0" disabled>Choose a user</option>
              {users.map(({ id, name }) => (
                <option value={id} key={id}>{name}</option>
              ))}
            </select>
            {hasUserError && <p className="app__error">Chose a user please</p>}
          </div>
          <button type="submit" className="app__button">Add</button>
        </form>
        <TodoList todos={allTodos} />
      </div>
    );
  }
}

export default App;
