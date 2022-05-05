import React, { Component } from 'react';
import todos from '../../api/todos';
import users from '../../api/users';
import { Todo } from '../../Types/Todo';
import './Form.scss';

type Props = {
  onAdd: (todo: Todo) => void,
};

type State = {
  userId: number,
  title: string,
  titleError: boolean,
  userIdError: boolean,
};

export class Form extends Component <Props, State> {
  state: State = {
    userId: 0,
    title: '',
    titleError: false,
    userIdError: false,
  };

  // eslint-disable-next-line max-len
  handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        this.setState({
          title: value.replace(/[^a-zA-Z\d\s]/, ''),
          titleError: false,
        });
        break;

      case 'userId':
        this.setState({
          userId: +value,
          userIdError: false,
        });
        break;

      default:
        break;
    }
  };

  reset = () => {
    this.setState({
      title: '',
      userId: 0,
    });
  };

  handeleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState((prev) => ({
      titleError: !prev.title,
      userIdError: !prev.userId,
    }));

    if (!this.state.title || !this.state.userId) {
      return;
    }

    const newTodo = {
      user: users.find(user => user.id === this.state.userId) || null,
      userId: this.state.userId,
      id: todos.length + 1,
      title: this.state.title,
      completed: false,
    };

    this.props.onAdd(newTodo);
    this.reset();
  };

  render() {
    const {
      title,
      userId,
      titleError,
      userIdError,
    } = this.state;

    return (
      <>
        <form className="form" onSubmit={this.handeleSubmit}>
          <label htmlFor="title" className="form__item">

            <input
              type="text"
              name="title"
              className="form__title"
              value={title}
              placeholder="Title"
              onChange={this.handleInputChange}
            />
            {titleError && (
              <div className="form__error">
                Please, enter the title.
              </div>
            )}
          </label>
          <label htmlFor="" className="form__item">
            <select
              id="userId"
              name="userId"
              className="form__input"
              value={userId}
              onChange={this.handleInputChange}
            >
              <option value="0" disabled selected>
                Choose name
              </option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {userIdError && (
              <div className="form__error">
                Please, choose a user.
              </div>
            )}
          </label>
          <button type="submit" className="form__button">
            Add Todo
          </button>
        </form>
      </>
    );
  }
}
