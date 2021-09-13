import React from 'react';
import { uuid } from 'uuidv4';
import { TodoInfo } from '../TodoInfo/TodoInfo';

import './TodoList.scss';

interface Props {
  addTodo: (todo: Todo) => void,
  todos: Todo[];
  users: User[];
}

interface State {
  title: string;
  name: string;
  error: string;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    title: '',
    name: '',
    error: '',
  };

  clearTitle = () => {
    this.setState({
      title: '',
      name: '',
      error: '',
    });
  };

  addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      title: value,
    });

    this.setState({ error: '' });
  };

  addChosenUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      name: value,
    });

    this.setState({ error: '' });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo: Todo = {
      uuid: uuid(),
      user: this.props.users.find(user => user.name === this.state.name) || null,
      userId: 1,
      title: this.state.title,
      completed: false,
    };

    if (!this.state.error) {
      this.props.addTodo(newTodo);

      this.clearTitle();
    }
  };

  validation = () => {
    if (!this.state.title) {
      this.setState({ error: 'Please enter the title' });
    }

    if (!this.state.name) {
      this.setState({ error: 'Please choose a user' });
    }
  };

  render() {
    const { todos, users } = this.props;
    const { title } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            name="title"
            className="input-title"
            type="text"
            placeholder="Write a task"
            onChange={this.addTitle}
            value={title}
          />

          <select
            name="user"
            value={this.state.name}
            onChange={this.addChosenUser}
          >
            <option value="">
              Please Choose user
            </option>

            {users.map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          <button
            className="btn-add"
            type="submit"
            onClick={this.validation}
          >
            Add
          </button>
        </form>

        <span className="error">{this.state.error}</span>

        <table className="todo-list">
          <thead>
            <tr>
              <th>User name</th>
              <th>User email</th>
              <th>Task</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.uuid} className="todo__item">
                <TodoInfo todo={todo} />
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}
