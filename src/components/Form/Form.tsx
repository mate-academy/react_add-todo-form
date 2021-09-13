import React from 'react';

import './Form.scss';

type Props = {
  users: User[];
  todos: Todo[];
  addTodo: (todo: Todo) => void;
};

type State = {
  name: string;
  title: string;
  isName: boolean;
  isTitle: boolean;
  userId: number;
};

// eslint-disable-next-line react/prefer-stateless-function
export class Form extends React.Component<Props, State> {
  state: State = {
    name: '',
    title: '',
    isName: true,
    isTitle: true,
    userId: 0,
  };

  handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, userId } = this.state;
    const { todos, addTodo, users } = this.props;

    if (userId === 0) {
      this.setState(() => ({ isName: false }));

      return;
    }

    if (title.length === 0) {
      this.setState({ isTitle: false });

      return;
    }

    this.setState(() => {
      const newTodo = {
        user: users.find(user => user.id === userId) || null,
        title,
        completed: false,
        userId,
        id: todos.length + 1,
      };

      addTodo(newTodo);

      return ({
        userId: 0,
        title: '',
        isName: true,
        isTitle: true,
      });
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === 'name') {
      this.setState({
        [name]: value,
        userId: parseInt(event.target.value, 10),
      });
    }

    if (name === 'title') {
      this.setState({
        [name]: value,
      });
    }
  };

  render() {
    const { users } = this.props;

    return (
      <form onSubmit={this.handleSubmit} className="form">
        <select
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          className="form__name"
        >
          <option value="">Choose a user</option>
          {users.map(user => (
            <option value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {!this.state.isName
            && <div className="form__error">Please choose a user!</div>}
        <input
          type="text"
          name="title"
          value={this.state.title}
          onChange={this.handleChange}
          className="form__title"
        />
        {!this.state.isTitle
            && <div className="form__error">Please choose a title!</div>}
        <button type="submit" className="form__button">add</button>
      </form>
    );
  }
}
