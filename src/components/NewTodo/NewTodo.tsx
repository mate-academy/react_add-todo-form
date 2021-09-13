import React from 'react';
import { uuid } from 'uuidv4';

interface Props {
  onAdd: (todo: Todo) => void;
  todos: Todo[];
  users: User[];
}

interface State {
  userId: number;
  title: string;
  completed: boolean;
  isUserEmpty: boolean;
  isTitleEmpty: boolean;
}

export class NewTodo extends React.Component<Props, State> {
  state: State = {
    userId: 0,
    title: '',
    completed: false,
    isUserEmpty: false,
    isTitleEmpty: false,
  };

  addNewTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value.replace(/[^ a-zA-Zа-яА-я0-9]/g, ''),
      isTitleEmpty: false,
    });
  };

  selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: +event.target.value,
      isUserEmpty: false,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { userId, title } = this.state;
    const { users, onAdd } = this.props;

    if (!userId || !title.trim()) {
      this.setState(prevState => ({
        isUserEmpty: !prevState.userId,
        isTitleEmpty: !prevState.title.trim(),
      }));

      return;
    }

    this.setState(prevState => {
      const newTodo = {
        user: users.find(user => user.id === userId) || null,
        userId,
        id: uuid(),
        title,
        completed: prevState.completed,
      };

      onAdd(newTodo);

      return ({
        userId: 0,
        title: '',
      });
    });
  };

  render() {
    const {
      title,
      isTitleEmpty,
      isUserEmpty,
      userId,
    } = this.state;

    const { users } = this.props;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="row justify-content-center g-3"
        noValidate
      >
        <h4>You can add a new task by filling in the form:</h4>

        <div className="col-4">
          <input
            className="form-control"
            type="text"
            name="newTask"
            id="newTask"
            value={title}
            onChange={this.addNewTask}
            placeholder="Enter new task here"
            required
          />
          {isTitleEmpty && (
            <span className="alert">Please enter the title!</span>
          )}
        </div>

        <div className="col-4">
          <select
            className="form-select"
            onChange={this.selectUser}
            value={userId}
            required
          >
            <option value={0}>Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isUserEmpty
            && <span className="alert">Please choose a user!</span>}
        </div>

        <div className="col-12 mb-4">
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>

      </form>
    );
  }
}
