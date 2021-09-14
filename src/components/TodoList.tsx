import React from 'react';
import users from '../api/users';

type Props = {
  todos: Todo[],
  addTodo: (todo: Todo) => void,
  users: User[],
};

type State = {
  title: string,
  name: string,
  isEmptyTitle: boolean,
  isEmptyName: boolean,
};

export class TodoList extends React.Component <Props, State> {
  state: State = {
    title: '',
    name: '',
    isEmptyTitle: false,
    isEmptyName: false,
  };

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      title: value,
      isEmptyTitle: false,
    });
  };

  handleChangeName = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      name: value,
      isEmptyName: false,
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { todos } = this.props;
    const { name, title } = this.state;

    if (title.length === 0) {
      this.setState({ isEmptyTitle: true });
    }

    if (name.length === 0) {
      this.setState({ isEmptyName: true });
    }

    const pickedUser = users.find((user) => user.name === name) || null;
    const latestId = Math.max(...todos.map(item => item.id)) + 1;
    const idOfPickedUser = pickedUser ? pickedUser.id : null;

    if (title && name) {
      const newTodo = {
        userId: idOfPickedUser,
        id: latestId,
        title,
        completed: false,
        user: pickedUser,
      };

      this.props.addTodo(newTodo);
      this.resetState();
    }
  };

  resetState = () => {
    this.setState({
      title: '',
      name: '',
      isEmptyTitle: false,
    });
  };

  render() {
    const { todos } = this.props;
    const { title, name } = this.state;

    return (
      <div className="Add__todo">

        <form onSubmit={this.handleSubmit} className="form">
          <select
            name="name"
            value={name}
            onChange={this.handleChangeName}
            className="form__name"
          >
            <option
              value=""
              disabled
            >
              Choose a user
            </option>
            {users.map(user => (
              <React.Fragment key={user.id}>
                <option value={user.name}>
                  {user.name}
                </option>
              </React.Fragment>
            ))}
          </select>
          {this.state.isEmptyName && (
            <div className="warningName">Please choose a user</div>
          )}
        </form>

        <div className="form">
          <form onSubmit={this.handleSubmit} className="form__title">
            <input
              type="text"
              value={title}
              name="title"
              onChange={this.handleChangeTitle}
              placeholder="Enter the title"
            />

            <button type="submit">
              Add User
            </button>

            {this.state.isEmptyTitle && (
              <div className="warningName">Please enter the title</div>
            )}
          </form>
        </div>

        <div className="table">
          <div className="name">Name</div>
          <div className="email">Email</div>
          <div className="task">Task</div>
          <div className="status">Status</div>
        </div>
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
              <div className="table">
                <div className="name">{todo.user?.name}</div>
                <div className="email">{todo.user?.email}</div>
                <div className="task">{todo.title}</div>
                <div className="status">
                  {todo.completed
                    ? 'Completed'
                    : 'in process'}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
