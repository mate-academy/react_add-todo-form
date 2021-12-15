import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/types';

import users from './api/users';
import todos from './api/todos';

interface State {
  todos: Todo[],
  title: string,
  select: number,
  choosenTitle: boolean,
  choosenPerson: boolean,
}

class App extends React.Component<{}, State> {
  state = {
    todos: [...todos],
    title: '',
    select: 0,
    choosenTitle: true,
    choosenPerson: true,
  };

  addTodo = (event: React.FormEvent) => {
    event.preventDefault();
    this.checkErrors();
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { title, select } = this.state;

    if (title && select) {
      this.setState(state => ({
        todos: [...state.todos, {
          title: state.title,
          id: state.todos.length + 1,
          userId: state.select,
        }],
      }));
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
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const { title, select } = state;

      return {
        choosenTitle: Boolean(title),
        choosenPerson: Boolean(select),
      };
    });
  };

  clearForms = () => {
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
        <h1 className="header">
          Add todo form
        </h1>

        <form className="form" onSubmit={this.addTodo}>
          <div className="form__title">
            <input
              type="text"
              name="title"
              placeholder="Enter the title"
              className="form__title--width"
              maxLength={35}
              value={this.state.title}
              onChange={this.handleChange}
            />

            {!this.state.choosenTitle
              && (
                <p className="form__error">
                  Error! Write your title !!!
                </p>
              )}
          </div>

          <div className="form__user">
            <select
              name="select"
              value={this.state.select}
              onChange={this.handleChange}
              className="form__user--width"
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {users.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>

            {!this.state.choosenPerson
              && (
                <p className="form__error">
                  Error! Choose your person !!!
                </p>
              )}
          </div>

          <button className="form__add" type="submit">
            Add
          </button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
