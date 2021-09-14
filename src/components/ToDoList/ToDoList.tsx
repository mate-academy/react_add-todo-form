import React from 'react';

interface State {
  title: string;
  name: string;
  isTitle: boolean;
  isName: boolean;
}

type Props = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  users: User[];
};

export class TodoList extends React.Component<Props, State> {
  state: State = {
    title: '',
    name: '',
    isTitle: false,
    isName: false,
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'title') {
      this.setState({
        [name]: value,
        isTitle: true,
      });
    }

    if (name === 'name') {
      this.setState({
        [name]: value,
        isName: true,
      });
    }
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { users, todos } = this.props;
    const {
      name, title,
    } = this.state;

    if (!title) {
      this.setState({ isTitle: true });
    }

    if (!name) {
      this.setState({ isName: true });
    }

    const maxID = Math.max.apply(null, todos.map(item => item.id));
    const newUser = users.find(user => user.name === name) || null;
    const newUserID = newUser ? newUser.id : null;

    if (title && name) {
      const todo = {
        title,
        id: maxID,
        userId: newUserID,
        completed: false,
        user: newUser,
      };

      this.props.addTodo(todo);
      this.clearState();
    }
  };

  clearState = () => {
    this.setState({
      title: '',
      name: '',
      isTitle: false,
      isName: false,
    });
  };

  render() {
    const { todos, users } = this.props;
    const {
      title,
      name,
      isTitle,
      isName,
    } = this.state;

    return (
      <ul>
        <form onSubmit={this.handleSubmit}>
          <select
            name="name"
            value={name}
            onChange={this.handleChange}
          >
            <option value="choose" disabled>
              choose a user
            </option>
            {users.map(user => (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isName && (
            <p>*Choose a user</p>
          )}

          <input
            type="text"
            name="title"
            placeholder="ToDo"
            value={title}
            onChange={this.handleChange}
          />

          {isTitle && (
            <p>*Please enter ToDo</p>
          )}

          <button type="submit">
            add todo
          </button>
        </form>
        {todos.map(todo => (
          <li key={todo.id}>
            <p>{todo.user?.name}</p>
            <p>{todo.title}</p>
          </li>
        ))}
      </ul>
    );
  }
}
