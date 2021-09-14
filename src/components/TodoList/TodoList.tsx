/* eslint-disable no-console */
import React from 'react';
import { uuid } from 'uuidv4';
import users from '../../api/users';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

type Props = {
  todos: Todo[],
  users: User[],
  addTodo: (addTodo: Todo) => void,
};

type State = {
  title: string;
  name: string;
  isTitleValid: boolean;
  isNameValid: boolean;
  isTitleTouch: boolean,
  isNameTouch: boolean,
};

export class TodoList extends React.Component<Props, State > {
  state: State = {
    title: '',
    name: '',
    isTitleValid: false,
    isNameValid: false,
    isTitleTouch: false,
    isNameTouch: false,
  };

  clearState = () => {
    this.setState({
      title: '',
      name: '',
      isTitleValid: false,
      isNameValid: false,
      isTitleTouch: false,
      isNameTouch: false,
    });
  };

  validation = () => {
    const {
      isNameValid,
      isTitleValid,
    } = this.state;

    return isTitleValid && isNameValid;
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      isTitleTouch: true,
    });

    const { value } = event.target;

    if (value) {
      this.setState({
        title: value,
        isTitleValid: true,
      });
    } else {
      this.setState({
        title: '',
        isTitleValid: false,
      });
    }
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    this.setState({
      isTitleTouch: true,
      isNameTouch: true,
    });

    const {
      name,
      title,
    } = this.state;

    if (this.validation()) {
      const currentUser = this.props.users.find(user => user.name === name) || null;
      const currentUserId = currentUser ? currentUser.id : null;

      this.props.addTodo({
        uuid: uuid(),
        title,
        userId: currentUserId,
        user: currentUser,
      });

      this.clearState();
    }
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      isNameTouch: true,
    });

    const { value } = event.target;

    if (value) {
      this.setState({
        name: event.target.value,
        isNameValid: true,
      });
    } else {
      this.setState({
        name: '',
        isNameValid: false,
      });
    }
  };

  render() {
    const { todos } = this.props;
    const {
      title,
      name,
      isNameValid,
      isTitleValid,
      isNameTouch,
      isTitleTouch,
    } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit} className="w-50 mx-auto">
          <input
            name="title"
            placeholder="Add a todo"
            onChange={this.handleChange}
            type="text"
            value={title}
            className="form-control"
          />
          {!isTitleValid && isTitleTouch && (
            <p>Please enter the title</p>
          )}

          <select
            name="name"
            value={name}
            onChange={this.handleSelectChange}
            className="form-select"
          >
            <option value="" disabled>
              Username
            </option>
            {users.map(user => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {!isNameValid && isNameTouch && (
            <p>Please choose a user</p>
          )}

          <button
            type="submit"
            className="btn btn-primary mx-auto mt-3"
          >
            Add todo
          </button>
        </form>

        <ul className="list-group">
          {todos.map(todo => (
            <li key={todo.uuid} className="list-group-item">
              <span className="text-info">
                {todo.user
                  ? (
                    `${todo.user.name}`
                  )
                  : ('User not a find')}
              </span>
              <span className="text-info">{` ${todo.title} `}</span>
            </li>
          ))}
        </ul>
      </>
    );
  }
}
