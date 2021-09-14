import React from 'react';
import { uuid } from 'uuidv4';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

interface Props {
  todos: Todo[],
  addTodo: (todo: Todo) => void;
  users: User[];
}

interface State {
  title: string;
  name: string;
  isTitleValid: boolean;
  isNameSelected: boolean;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    title: '',
    name: '',
    isTitleValid: false,
    isNameSelected: false,
  };

  clearState = () => {
    this.setState({
      title: '',
      name: '',
      isTitleValid: false,
      isNameSelected: false,
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { name, title } = this.state;

    if (!title) {
      this.setState({ isTitleValid: true });
    }

    if (!name) {
      this.setState({ isNameSelected: true });
    }

    if (title && name) {
      const actualUser = this.props.users.find(user => user.name === name) || null;
      const actualUserID = actualUser ? actualUser.id : null;

      this.props.addTodo({
        uuid: uuid(),
        title: this.state.title,
        userId: actualUserID,
        user: actualUser,
      });

      this.clearState();
    }
  };

  render() {
    const { todos, users } = this.props;
    const {
      title, name, isNameSelected, isTitleValid,
    } = this.state;

    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="w-50 mx-auto"
        >

          <input
            type="text"
            placeholder="Add a todo"
            value={title}
            onChange={this.handleChange}
            className="w-100 mb-2 py-2 border rounded"
          />
          {isTitleValid && (
            <p>Please enter the title</p>
          )}

          <select
            name="name"
            value={name}
            onChange={this.handleSelectChange}
            className="w-100 mb-2 py-2 border rounded"
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
          {isNameSelected && (
            <p>Please choose a user</p>
          )}

          <button
            type="submit"
            className="w-25 border bg-light py-2 mt-3"
          >
            Add todo
          </button>
        </form>

        <ul className="w-50 mx-auto list-group mt-4">
          {todos.map(todo => (
            <li
              key={todo.uuid}
              className="list-group-item"
            >
              <span className="text-info">
                {todo.user
                  ? (
                    `${todo.user.name}`
                  )
                  : ('No User')}
              </span>
              {' '}
              {todo.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
