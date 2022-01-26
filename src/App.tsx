import React from 'react';
import { TodoList } from './components/Todo/TodoList';

import './App.scss';

import users from './api/users';
import todos from './api/todos';

const getUserId = (id: number) => users.find((user) => user.id === id);

const todosWithUsers: Todo[] = todos.map(todo => ({
  ...todo,
  user: getUserId(todo.userId) || null,
}));

type State = {
  todosCopy: Todo[];
  todoTitle: string;
  selectUser: number;
  hasTitlError: boolean;
  hasSelectorError: boolean;
};

type Props = {};

export class App extends React.Component<Props, State> {
  state: State = {
    todosCopy: [...todosWithUsers],
    todoTitle: '',
    selectUser: 0,
    hasTitlError: false,
    hasSelectorError: false,
  };

  handleNewTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoTitle: event.target.value,
    });
  };

  handleSelector = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectUser: +event.target.value,
    });
  };

  clearState = () => {
    this.setState({
      todoTitle: '',
      selectUser: 0,
      hasTitlError: false,
      hasSelectorError: false,
    });
  };

  addNewTodo = (todo: Todo) => {
    this.setState(prevState => ({
      todosCopy: [...prevState.todosCopy, todo],
    }));
  };

  validateForm = () => {
    const { todoTitle, selectUser } = this.state;

    if (!todoTitle || !selectUser) {
      this.setState({
        hasTitlError: !todoTitle,
        hasSelectorError: !selectUser,
      });

      return false;
    }

    return true;
  };

  getNewTodo = () => {
    const { todosCopy, todoTitle, selectUser } = this.state;

    return {
      userId: selectUser,
      id: todosCopy.length + 1,
      title: todoTitle,
      completed: false,
      user: getUserId(selectUser) || null,
    };
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isFormValid = this.validateForm();

    if (isFormValid) {
      const newTod = this.getNewTodo();

      this.addNewTodo(newTod);
      this.clearState();
    }
  };

  render() {
    const
      {
        todosCopy,
        todoTitle,
        selectUser,
        hasTitlError,
        hasSelectorError,
      } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>
        <form
          className="App__form"
          onSubmit={this.handleSubmit}
        >
          <button className="App__button" type="submit">Add user</button>
          {' '}
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
                value={todoTitle}
                onChange={this.handleNewTodoTitle}
                className="App__input"
                placeholder="Type some title"
              />
              {hasTitlError && (
                <span className="App__error">Please enter the title</span>
              )}
            </section>

            <section>
              <select
                value={selectUser}
                onChange={this.handleSelector}
                className="App__input"
              >
                <option value="0">Choose a user</option>
                {users.map(person => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
              {hasSelectorError && (
                <span className="App__error">Please choose a user</span>
              )}
            </section>
          </>
        </form>
        <TodoList props={todosCopy} />
      </div>
    );
  }
}
