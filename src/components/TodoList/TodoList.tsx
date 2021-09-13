import React from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  todos: Todo[];
  users: User[];
  addTodo: (todo: Todo) => void;
}

interface State {
  title: string;
  name: string;
  isInput: boolean;
  isSelect: boolean;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    title: '',
    name: '',
    isInput: false,
    isSelect: false,
  };

  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      title: value,
    });
  };

  handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      name: value,
    });
  };

  formClear = () => {
    this.setState({
      title: '',
      name: '',
      isInput: false,
      isSelect: false,
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { users } = this.props;
    const { name, title } = this.state;

    if (!title) {
      this.setState({ isInput: true });
    }

    if (!name) {
      this.setState({ isSelect: true });
    }

    const newUser = users.find(user => user.name === name) || null;

    if (title && name) {
      const todo = {
        title,
        id: uuidv4(),
        userId: uuidv4(),
        user: newUser,
      };

      this.props.addTodo(todo);
      this.formClear();
    }
  };

  render() {
    const { todos, users } = this.props;
    const {
      title, name, isSelect, isInput,
    } = this.state;

    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className="d-flex flex-column justify-content-center align-items-center"
        >
          <input
            type="text"
            id="textInput"
            name="title"
            placeholder="Enter the title"
            value={title}
            onChange={this.handleChangeInput}
            className="w-25 mb-2 py-2 border rounded"
          />
          {isInput && (
            <p>Please enter the title</p>
          )}
          <select
            name="name"
            value={name}
            onChange={this.handleChangeSelect}
            className="w-25 mb-2 py-2 border rounded"
          >
            <option value="" disabled>
              Choose a user
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
          {isSelect && (
            <p>Please choose a user</p>
          )}
          <button
            type="submit"
            className="w-25 mb-2 py-2 border rounded bg-primary text-light"
          >
            Add
          </button>
        </form>
        <ul className="w-50 mx-auto row">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="border rounded py-2 mb-2 row"
            >
              {todo.user && (
                `${todo.user.name} : ${todo.title}`
              )}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
