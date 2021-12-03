import React, { ChangeEventHandler, FormEventHandler } from 'react';
import { AddTodo } from '../../types/AddTodo';
import { User } from '../../types/User';

type Props = {
  users: User[];
  addTodo: AddTodo;
};

type State = {
  newTitle: string,
  isNewTitle: boolean,
  userName: string,
  isUserName: boolean,
};

export class AddTodoForm extends React.Component<Props, State> {
  state = {
    newTitle: '',
    isNewTitle: true,
    userName: '',
    isUserName: true,
  };

  submitHandler: FormEventHandler = (e) => {
    e.preventDefault();

    const {
      newTitle,
      userName,
    } = this.state;

    if (userName && newTitle) {
      this.props.addTodo(userName, newTitle);
      this.setState({
        newTitle: '',
        isNewTitle: true,
        userName: '',
        isUserName: true,
      });
    }

    this.setState({
      isNewTitle: !!newTitle,
      isUserName: !!userName,
    });
  };

  titleChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    const valueCharactersArr = value.split('');
    const characters = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя abcdefghijklmnopqrstuvwxyz123456789';
    const canWrite = valueCharactersArr.every(char => {
      return characters.includes(char.toLocaleLowerCase());
    });

    if (canWrite) {
      this.setState({
        newTitle: value,
        isNewTitle: true,
      });
    }
  };

  userNameChangeHandler: ChangeEventHandler<HTMLSelectElement> = (e) => this.setState({
    userName: e.target.value,
    isUserName: true,
  });

  render() {
    const {
      newTitle,
      isNewTitle,
      userName,
      isUserName,
    } = this.state;

    const {
      users,
    } = this.props;

    return (
      <fieldset>
        <legend>Add todo form</legend>

        <form
          onSubmit={this.submitHandler}
        >
          <p>Todo title</p>

          <label htmlFor="title">
            <input
              type="text"
              id="title"
              name="title"
              value={newTitle}
              placeholder="Enter the title"
              onChange={this.titleChangeHandler}
            />
          </label>

          {!isNewTitle && <span>Please enter the title</span>}

          <p>User</p>

          <label htmlFor="user">
            <select
              id="user"
              value={userName}
              onChange={this.userNameChangeHandler}
            >
              <option defaultValue="">Chose user</option>
              {users.map(({ name }) => {
                return (
                  <option
                    key={name}
                    defaultValue={name}
                  >
                    {name}
                  </option>
                );
              })}
            </select>
          </label>

          {!isUserName && <span>Please choose a user</span>}

          <button
            type="submit"
            style={{ display: 'block' }}
          >
            Add
          </button>
        </form>

      </fieldset>
    );
  }
}
