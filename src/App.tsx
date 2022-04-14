import React from 'react';
import { TodoList } from './components/Todo/TodoList';

import './App.scss';

import users from './api/users';
import todos from './api/todos';

const getUserId = (id: number) => users.find((user) => user.id === id);

const todosWithUsers: TodoWithUser[] = todos.map(todo => ({
  ...todo,
  user: getUserId(todo.userId) || null,
}));

type State = {
  todosCopy: TodoWithUser[];
  todoTitle: string;
  selectUserId: number;
  hasTitleError: boolean;
  hasSelectorError: boolean;
};

export class App extends React.Component<{}, State> {
  state: State = {
    todosCopy: [...todosWithUsers],
    todoTitle: '',
    selectUserId: 0,
    hasTitleError: false,
    hasSelectorError: false,
  };

  handleNewTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoTitle: event.target.value,
    });
  };

  handleSelector = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectUserId: +event.target.value,
    });
  };

  resetState = () => {
    this.setState({
      todoTitle: '',
      selectUserId: 0,
      hasTitleError: false,
      hasSelectorError: false,
    });
  };

  addNewTodo = (todo: TodoWithUser) => {
    this.setState(prevState => ({
      todosCopy: [...prevState.todosCopy, todo],
    }));
  };

  isValidForm = () => {
    const { todoTitle, selectUserId } = this.state;

    if (!todoTitle || !selectUserId) {
      this.setState({
        hasTitleError: !todoTitle,
        hasSelectorError: !selectUserId,
      });

      return false;
    }

    return true;
  };

  getNewTodo = () => {
    const { todosCopy, todoTitle, selectUserId } = this.state;

    return {
      userId: selectUserId,
      id: todosCopy.length + 1,
      title: todoTitle,
      completed: false,
      user: getUserId(selectUserId) || null,
    };
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isFormValid = this.isValidForm();

    if (isFormValid) {
      const newTod = this.getNewTodo();

      this.addNewTodo(newTod);
      this.resetState();
    }
  };

  render() {
    const
      {
        todosCopy,
        todoTitle,
        selectUserId,
        hasTitleError,
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
          <div>
            <section>
              <input
                type="text"
                id="title"
                value={todoTitle}
                onChange={this.handleNewTodoTitle}
                className="App__input"
                placeholder="Type some title"
              />
              {hasTitleError && (
                <span className="App__error">Please enter the title</span>
              )}
            </section>

            <section>
              <select
                value={selectUserId}
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
          </div>
        </form>
        <TodoList props={todosCopy} />
      </div>
    );
  }
}
