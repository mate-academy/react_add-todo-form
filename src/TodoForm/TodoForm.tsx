import React from 'react';
import { v4 } from 'uuid';
import users from '../api/users';
import './TodoForm.scss';

type Props = {
  addTodoItem: (item: Todo) => void;
};

type State = {
  selectedUser: string;
  todo: string;
  isSelect: boolean;
  isInput: boolean;
};

export class TodoForm extends React.Component<Props, State> {
  state = {
    selectedUser: '',
    todo: '',
    isSelect: false,
    isInput: false,
  };

  makeStateDefault = () => {
    this.setState({
      selectedUser: '',
      todo: '',
    });
  };

  findSelectedUser = () => {
    return users.find(user => user.name === this.state.selectedUser) || null;
  };

  selectHandleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState(
      {
        selectedUser: event.target.value,
        isSelect: false,
      },
    );
  };

  inputHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      {
        todo: event.target.value,
        isInput: false,
      },
    );
  };

  isValid = (value: string) => {
    return value === '';
  };

  formHandleSubmit = (event: React.FormEvent) => {
    const { addTodoItem } = this.props;
    const { selectedUser, todo } = this.state;

    event.preventDefault();

    this.setState(
      {
        isInput: this.isValid(todo),
        isSelect: this.isValid(selectedUser),
      },
    );

    if (todo !== '' && selectedUser !== '') {
      addTodoItem(
        {
          userId: this.findSelectedUser()?.id || 0,
          id: v4(),
          title: todo,
          completed: false,
          user: this.findSelectedUser(),
        },
      );
      this.makeStateDefault();
    }
  };

  render() {
    const {
      selectedUser,
      todo,
      isSelect,
      isInput,
    } = this.state;

    return (
      <form
        className="TodoForm App__TodoForm"
        onSubmit={this.formHandleSubmit}
      >
        <div>
          <select
            className="TodoForm__item"
            value={selectedUser}
            onChange={this.selectHandleChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option
                value={user.name}
                key={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>

          {isSelect && (
            <div className="validation-message">
              <span className="little-red-star">*</span>
              Please, choose a user
            </div>
          )}
        </div>

        <div>
          <input
            className="TodoForm__item"
            type="text"
            placeholder="Enter the title"
            value={todo}
            onChange={this.inputHandleChange}
          />

          {isInput && (
            <div className="validation-message">
              <span className="little-red-star">*</span>
              Please, enter the title
            </div>
          )}
        </div>

        <button
          type="submit"
          className="TodoForm__button"
        >
          Add
        </button>
      </form>
    );
  }
}
