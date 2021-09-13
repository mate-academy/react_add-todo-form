import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Props {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  users: User[];
}

interface State {
  title: string;
  name: string;
  isTitle: boolean;
  isName: boolean;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    title: '',
    name: '',
    isTitle: false,
    isName: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as Pick<State, 'title' | 'name'>);
  };

  clearState = () => {
    this.setState({
      title: '',
      name: '',
      isTitle: false,
      isName: false,
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { users, todos } = this.props;
    const { name, title } = this.state;

    if (!title) {
      this.setState({ isTitle: true });
    }

    if (!name) {
      this.setState({ isName: true });
    }

    const maxID = Math.max.apply(null, todos.map(item => item.id)) + 1;
    const relevantUser = users.find(user => user.name === name) || null;
    const relevantUserID = relevantUser ? relevantUser.id : null;

    if (title && name) {
      const todo = {
        title,
        id: maxID,
        userId: relevantUserID,
        completed: false,
        user: relevantUser,
      };

      this.props.addTodo(todo);
      this.clearState();
    }
  };

  render() {
    const { todos, users } = this.props;
    const {
      title, name, isName, isTitle,
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
            placeholder="Add a todo"
            value={title}
            onChange={this.handleChange}
            className="w-50 mb-2 py-2 border rounded"
          />
          {isTitle && (
            <p>*Please enter the title</p>
          )}

          <select
            name="name"
            value={name}
            onChange={this.handleChange}
            className="w-50 mb-2 py-2 border rounded"
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
          {isName && (
            <p>*Choose a user</p>
          )}

          <button
            type="submit"
            className="w-25 mb-3 py-2 border rounded bg-primary text-light"
          >
            Add a todo
          </button>
        </form>

        <ul className="mx-auto row align-items-center">
          {todos.map(todo => (
            <li
              key={todo.id}
              className="border rounded py-2 mb-2 row align-items-center"
            >
              <span className="col-md-4">
                {todo.user
                  ? (
                    `${todo.user.name}`
                  )
                  : ('Unknown User')}
              </span>
              {' '}
              <span className="col-md-4">
                {todo.title}
              </span>
              {' '}
              <span className="col-md-4">
                {!todo.completed
                  ? ('Still in progress')
                  : ('Completed')}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
