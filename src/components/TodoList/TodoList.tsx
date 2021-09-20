import React from 'react';
import { uuid } from 'uuidv4';
import { UserInfo } from '../UsersInfo';
import { TodoInfo } from '../TodoInfo';

import 'bootstrap/dist/css/bootstrap.min.css';
import './TodoList.scss';

interface Props {
  todos: Todo[];
  users: User[];
  addTodo: (todo: Todo) => void;
}

interface State {
  title: string;
  name: string;
  titleValid: boolean;
  nameValid: boolean;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    title: '',
    name: '',
    titleValid: false,
    nameValid: false,
  };

  clearState = () => {
    this.setState({
      title: '',
      name: '',
      titleValid: false,
      nameValid: false,
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState((currentState) => ({
      ...currentState,
      [name]: value,
      [`${name}Valid`]: true,
    }));
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { users, todos } = this.props;
    const { name, title } = this.state;

    if (!title) {
      this.setState({
        titleValid: false,
      });
    }

    if (!name) {
      this.setState({
        nameValid: false,
      });
    }

    const maxId = Math.max.apply(null, todos.map(todo => todo.id)) + 1;

    const visibleUser = users.find(user => user.name === name) || null;

    if (title && name) {
      const newTodo = {
        userId: visibleUser ? visibleUser.id : null,
        id: maxId,
        uuid: uuid(),
        title: this.state.title,
        completed: false,
        user: visibleUser,
      };

      this.props.addTodo(newTodo);
      this.clearState();
    }
  };

  render() {
    const { todos, users } = this.props;
    const {
      title,
      name,
      titleValid,
      nameValid,
    } = this.state;

    return (
      <>
        <form
          className="d-flex flex-column justify-content-center align-items-center mb-4 form-control form-control-lg"
          onSubmit={this.handleSubmit}
        >
          <input
            className="input-group mb-3"
            onChange={this.handleChange}
            placeholder="Add a todo"
            name="title"
            type="text"
            value={title}
          />
          {!titleValid && (
            <p>Please enter the title</p>
          )}

          <select
            className="form-select form-select-lg mb-3"
            name="name"
            value={name}
            onChange={this.handleChange}
          >
            <option value="" disabled>
              Chose a user
            </option>
            {users.map((user) => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {!nameValid && (
            <p>Please choose a user</p>
          )}
          <button
            className="btn btn-secondary"
            type="submit"
          >
            Add a todo
          </button>
        </form>

        <ul className="list">
          {todos.map((todo) => (
            <li
              className="list__item"
              key={todo.uuid}
            >
              {todo.user && <UserInfo user={todo.user} />}
              <TodoInfo todo={todo} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}
