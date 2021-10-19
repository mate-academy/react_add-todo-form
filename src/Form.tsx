import React from 'react';
import './Form.scss';

type State = {
  userId: number,
  title: string,
  isSelected: boolean,
  hasTitle: boolean,
};

type Props = {
  todos: Todo[],
  users: User[],
  addTodo: (todo: Todo) => void,
};

export class Form extends React.Component<Props, State> {
  state: State = {
    userId: 0,
    title: '',
    isSelected: true,
    hasTitle: true,
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { userId, title } = this.state;
    const { users, todos, addTodo } = this.props;

    if (userId === 0) {
      this.setState({ isSelected: false });

      return;
    }

    if (title.length === 0) {
      this.setState({ hasTitle: false });

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
      isSelected: true,
    });
  };

  addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      hasTitle: true,
    });
  };

  render() {
    const { users } = this.props;
    const {
      userId, isSelected, title, hasTitle,
    } = this.state;

    return (
      <form
        action="#"
        onSubmit={this.handleSubmit}
        className="form"
      >
        <select
          onChange={this.selectUser}
          value={userId}
          className="select"
        >
          <option value="">Choose a user</option>
          {users.map(user => (
            <option value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {!isSelected
          && <div className="error">Please choose a user</div>}
        <input
          type="text"
          onChange={this.addTitle}
          value={title}
          placeholder="Enter the title"
        />
        {!hasTitle
          && <div className="error">Please enter the title</div>}
        <button
          type="submit"
          className="button"
        >
          Add
        </button>
      </form>
    );
  }
}
