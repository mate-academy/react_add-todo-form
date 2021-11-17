import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromSever from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/types';

interface State {
  todos: Todo[],
  title: string,
  select: number,
  choosenTitle: boolean,
  choosenPerson: boolean,
}

class App extends React.Component<{}, State> {
  state = {
    todos: [...todosFromServer],
    title: '',
    select: 0,
    choosenTitle: true,
    choosenPerson: true,
  };

  addTodo = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    this.checkErrors();
    if (this.state.title && this.state.select) {
      this.setState(state => ({
        todos: [...state.todos, {
          title: state.title,
          id: state.todos.length + 1,
          userId: state.select,
        }],
      }));

      this.clearForm();
    }
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    const errorName = name === 'title' ? 'choosenTitle' : 'choosenPerson';

    this.setState(state => ({
      ...state,
      [name]: value,
      [errorName]: true,
    }));
  };

  checkErrors = () => {
    this.setState(state => {
      const { title, select } = state;

      return {
        choosenTitle: Boolean(title),
        choosenPerson: Boolean(select),
      };
    });

    return this.handleChange;
  };

  clearForm = () => {
    this.setState({
      title: '',
      select: 0,
      choosenTitle: true,
      choosenPerson: true,
    });
  };

  render() {
    return (
      <div className="App">
        <h1 className="header">Add todo form</h1>
        <form className="form" onSubmit={this.addTodo}>
          <div className="form__title">
            <input
              type="text"
              name="title"
              placeholder="Title"
              maxLength={35}
              value={this.state.title}
              onChange={this.handleChange}
            />

            {!this.state.choosenTitle
            && (
              <p className="form__error">
                Write your title
              </p>
            )}
          </div>

          <div className="form__user">
            <select
              name="select"
              value={this.state.select}
              onChange={this.handleChange}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>
              {usersFromSever.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>

            {!this.state.choosenPerson
              && (
                <p className="form__error">
                  Choose your person
                </p>
              )}
          </div>

          <button
            className="form__add"
            type="submit"
          >
            Add
          </button>
        </form>

        <span>Users: </span>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
