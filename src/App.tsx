import React from 'react';
import './App.scss';
import classNames from 'classnames';
import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';
import TodoList from './components/Todolist';

type State = {
  todd: Todo[],
  name: string,
  title: string,
  nameErr: boolean,
  titleErr: boolean,
};

class App extends React.Component <{}, State> {
  state: State = {
    todd: [...todos],
    name: '',
    title: '',
    nameErr: false,
    titleErr: false,
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(prevState => {
      if (!prevState.name || !prevState.title) {
        return {
          ...prevState,
          nameErr: !prevState.name,
          titleErr: !prevState.title,
        };
      }

      const maxId = Math.max(...prevState.todd.map(todo => todo.id));
      const currUserIndex = users.findIndex((user) => prevState.name === user.name);

      const newTodo = {
        id: maxId + 1,
        title: prevState.title,
        userId: users[currUserIndex].id,
      };

      return {
        name: '',
        title: '',
        todd: [
          newTodo,
          ...prevState.todd,
        ],
      };
    });
  };

  handleNameChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      name: event.target.value,
      nameErr: false,
    });
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      titleErr: false,
    });
  };

  render() {
    const {
      title,
      name,
      nameErr,
      titleErr,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form className="form" onSubmit={this.handleFormSubmit}>
          <div className="input">
            <select
              value={name}
              onChange={this.handleNameChange}
              className={classNames('form__select', {
                'field-error': nameErr,
              })}
            >
              <option>Choose name</option>
              {users.map(user => {
                return (
                  <option>{user.name}</option>
                );
              })}
              ;
            </select>
            {nameErr && (
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
                { 'field-error': titleErr })}
            />
            {titleErr && (
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
