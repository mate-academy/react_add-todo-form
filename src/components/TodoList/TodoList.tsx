import React from 'react';
import { uuid } from 'uuidv4';

import users from '../../api/users';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
  users: User[];
  addTodo: (todo: Todo) => void;
};

interface State {
  title: string;
  name: string;
  isValidInput: boolean;
  isValidSelect: boolean;
}

export class TodoList extends React.Component<Props, State> {
  state = {
    title: '',
    name: '',
    isValidInput: true,
    isValidSelect: true,
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (this.state.name === '') {
      this.setState({ isValidSelect: false });

      return;
    }

    if (this.state.title.length === 0) {
      this.setState({ isValidInput: false });

      return;
    }

    this.setState(() => {
      const newTodo: Todo = {
        uuid: uuid(),
        user: this.props.users.find(user => user.name === this.state.name) || null,
        userId: 0,
        title: this.state.title,
        completed: false,
      };

      this.props.addTodo(newTodo);

      return ({
        title: '',
        name: '',
      });
    });
  };

  addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      title: value,
      isValidInput: true,
    });
  };

  addUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      name: value,
      isValidSelect: true,
    });
  };

  render() {
    const { todos } = this.props;
    const { title, name } = this.state;

    return (
      <>
        <form className="App__form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Write task here"
            onChange={this.addTitle}
            value={title}
          />
          {!this.state.isValidInput
              && <div className="alert alert-warning" role="alert">Please enter the title!</div>}
          <select
            name="user"
            className="form-select"
            aria-label="Default select example"
            value={name}
            onChange={this.addUser}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          {!this.state.isValidSelect
            && <div className="alert alert-warning" role="alert">Please choose a user!</div>}
          <button className="btn btn-primary" type="submit">Add</button>
        </form>
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Task</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {todos.map(todo => (
              <tr key={todo.uuid}>
                <TodoInfo todo={todo} />
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}
