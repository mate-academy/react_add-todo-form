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
  isTitle: boolean;
  isName: boolean;
}

export class TodoList extends React.Component<Props, State> {
  state = {
    title: '',
    name: '',
    isTitle: false,
    isName: false,
  };

  clearState = () => {
    this.setState({
      title: '',
      name: '',
      isTitle: false,
      isName: false,
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    const key: keyof State = name as keyof State;

    this.setState({
      [key]: value,
    } as Pick<State, 'title' | 'name'>);
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { users, todos } = this.props;
    const { name, title } = this.state;

    if (!title) {
      this.setState({
        isTitle: true,
      });
    }

    if (!name) {
      this.setState({
        isTitle: true,
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
      isTitle,
      isName,
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
          {isTitle && (
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
          {isName && (
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
