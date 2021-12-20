import React from 'react';
import todos from '../api/todos';

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

export class AddTodoForm extends React.Component<Props, State> {
  state: State = {
    userId: 0,
    title: '',
    completed: false,
    isUserEmpty: false,
    isTitleEmpty: false,
  };

  handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
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
    const { users, onAdd: addTodo } = this.props;

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
        id: todos.length + 1,
        title,
        completed: prevState.completed,
      };

      addTodo(newTodo);
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
        className="form-inline"
        noValidate
      >
        <h4 className="mb-5">Add a new task:</h4>

        <div className="mb-5">
          <input
            className="form-control"
            type="text"
            name="newTask"
            id="newTask"
            value={title}
            onChange={this.handleTitle}
            placeholder="Enter new task here"
            required
          />
          {isTitleEmpty && (
            <span className="alert">Please enter the title!</span>
          )}
        </div>

        <div className="mb-5">
          <select
            className="form-select ml-1"
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
          {isUserEmpty && (
            <span className="alert">Please choose a user!</span>
          )}
        </div>

        <div>
          <button type="submit" className="btn btn-primary mb-5 ml-1">
            Add
          </button>
        </div>

      </form>
    );
  }
}
