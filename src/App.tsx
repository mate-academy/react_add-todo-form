import React from 'react';
import './App.scss';
import classNames from 'classnames';
import users from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import TodoList from './components/Todolist';

type State = {
  todos: Todo[],
  id: number,
  title: string,
  IdError: boolean,
  TitleError: boolean;
};

class App extends React.Component<{}, State> {
  state = {
    todos: todosFromServer,
    id: 0,
    title: '',
    IdError: false,
    TitleError: false,
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const { todos, id, title } = this.state;

    event.preventDefault();

    if (!id || !title) {
      this.setState({
        IdError: !id,
        TitleError: !title,
      });
    } else {
      const maxId = Math.max(...todos.map(todo => todo.id));
      const newTodo = {
        id: maxId + 1,
        title,
        userId: id,
      };

      this.setState((prevState) => {
        return {
          id: 0,
          title: '',
          todos: [
            newTodo,
            ...prevState.todos,
          ],
        };
      });
    }
  };

  handleIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      id: +event.target.value,
      IdError: false,
    });
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      TitleError: false,
    });
  };

  render() {
    const {
      todos,
      title,
      id,
      IdError,
      TitleError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form className="form" onSubmit={this.handleFormSubmit}>
          <div className="input">
            <select
              value={id}
              onChange={this.handleIdChange}
              className={classNames('form__select', {
                'field-error': IdError,
              })}
            >
              <option>Choose name</option>
              {users.map(user => {
                return (
                  <option value={user.id} key={user.id}>{user.name}</option>
                );
              })}
              ;
            </select>
            {IdError && (
              <span className="nameErr">
                Please choose name
              </span>
            )}
          </div>
          <div className="input">
            <input
              type="text"
              placeholder="....."
              value={title}
              onChange={this.handleTitleChange}
              className={classNames('form__input',
                { 'field-error': TitleError })}
            />
            {TitleError && (
              <span className="titleErr">
                Please enter a title
              </span>
            )}
          </div>
          <button
            type="submit"
            className="form__button"
          >
            Add
          </button>
        </form>
        <p>
          <TodoList todos={todos} />
        </p>
      </div>

    );
  }
}

export default App;
