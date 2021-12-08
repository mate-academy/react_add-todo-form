import React, { ChangeEventHandler, FormEventHandler } from 'react';
import { AddTodo } from '../../types/AddTodo';
import { User } from '../../types/User';

type Props = {
  users: User[];
  addTodo: AddTodo;
};

type State = {
  title: string,
  userName: string,
  buttonClicked: boolean,
};

export class AddTodoForm extends React.Component<Props> {
  state: State = {
    title: '',
    userName: '',
    buttonClicked: false,
  };

  submitHandler: FormEventHandler = (e) => {
    e.preventDefault();

    const {
      title,
      userName,
    } = this.state;

    const canAdd = !!userName && !!title.trim();

    if (canAdd) {
      this.props.addTodo(userName, title);
    }

    this.setState({
      title: canAdd ? '' : title,
      userName: canAdd ? '' : userName,
      buttonClicked: !canAdd,
    });
  };

  changeHandler: ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = (e) => {
    const { name } = e.target;
    const { value } = e.target;
    const validation = /^[a-zA-ZА-Яа-я0-9\s]+$/;

    if (name === 'title' && !validation.test(value) && value.length > 0) {
      return;
    }

    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      title,
      userName,
      buttonClicked,
    } = this.state;

    const {
      users,
    } = this.props;

    return (
      <fieldset>
        <legend>Add todo form</legend>

        <form onSubmit={this.submitHandler}>
          <p>Todo title</p>

          <label htmlFor="title">
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              placeholder="Enter the title"
              onChange={this.changeHandler}
            />
          </label>

          {(buttonClicked && !title.trim()) && (<span>Please enter the title</span>)}

          <p>User</p>

          <label htmlFor="user">
            <select
              id="user"
              name="userName"
              value={userName}
              onChange={this.changeHandler}
            >
              <option value="">Choose user</option>
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

          {(buttonClicked && !userName) && (<span>Please choose a user</span>)}

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
