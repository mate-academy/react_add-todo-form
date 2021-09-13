import React, { FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface State {
  userId: number;
  title: string;
  isUserSelected: boolean,
  isTitleEntered: boolean,
}

interface Props {
  todos: Todo[];
  users: User[];
  addTodo: (todo: Todo) => void;
}

export class Form extends React.Component<Props, State> {
  state = {
    userId: 0,
    title: '',
    isUserSelected: true,
    isTitleEntered: true,
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { userId, title } = this.state;
    const { users, todos, addTodo } = this.props;

    if (userId === 0) {
      this.setState({ isUserSelected: false });

      return;
    }

    if (title.length === 0) {
      this.setState({ isTitleEntered: false });

      return;
    }

    this.setState(() => {
      const newTodo = {
        user: users.find(user => user.id === userId) || null,
        userId,
        id: todos.length + 1,
        title,
        completed: false,
      };

      addTodo(newTodo);

      return ({
        userId: 0,
        title: '',
      });
    });
  };

  selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: +event.target.value,
      isUserSelected: true,
    });
  };

  addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      isTitleEntered: true,
    });
  };

  render() {
    const { users } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className="mb-3">
        <select
          className="form-select form-select-lg mb-3"
          onChange={this.selectUser}
          value={this.state.userId}
        >
          <option value="">Choose a user</option>
          {users.map(user => (
            <option value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {!this.state.isUserSelected
            && <div className="alert alert-danger">Please choose a user!</div>}
        <input
          className="form-control form-control-lg mb-3"
          type="text"
          onChange={this.addTitle}
          value={this.state.title}
          placeholder="Enter the title"
        />
        {!this.state.isTitleEntered
              && <div className="alert alert-danger">Please enter the title!</div>}
        <button type="submit" className="btn btn-success btn-lg">Add</button>
      </form>
    );
  }
}
