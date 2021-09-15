import React from 'react';
import { uuid } from 'uuidv4';
import users from '../api/users';

interface State {
  userId: number;
  title: string;
  completed: boolean;
  isUserEmpty: boolean;
  isTitleEmpty: boolean;
}

interface Props {
  addTodo: (newTodo:Todo) => void;
}

export class NewTodo extends React.Component<Props, State> {
  state: State = {
    userId: 0,
    title: '',
    completed: false,
    isUserEmpty: false,
    isTitleEmpty: false,
  };

  onChange = (event: { target: { value: string; }; }) => {
    const { value } = event.target;

    this.setState({
      title: value,
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
    const { userId, title, completed } = this.state;

    if (!userId || !title.trim()) {
      this.setState(prevState => ({
        isUserEmpty: !prevState.userId,
        isTitleEmpty: !prevState.title.trim(),
      }));

      return;
    }

    const newTodo = {
      user: users.find(user => user.id === userId) || null,
      userId,
      id: uuid(),
      title,
      completed,
    };

    this.props.addTodo(newTodo);
    this.setState({
      title: '',
      userId: 0,
      isUserEmpty: false,
      isTitleEmpty: false,
    });
  };

  render() {
    const { isUserEmpty, isTitleEmpty } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <div className="inputField">
          <input
            type="text"
            name="title"
            className="input_todo"
            placeholder="Add new todo"
            value={this.state.title}
            onChange={this.onChange}
          />
          {isTitleEmpty && <p>Please Help me</p>}
          <select
            className="input_choice"
            name="user"
            value={this.state.userId}
            onChange={this.selectUser}
          >
            <option value={0}>
              Choose a user
            </option>
            {users.map(person => <option value={person.id} key={person.id}>{person.name}</option>)}
          </select>
          {isUserEmpty && <p>Error</p>}
          <button
            className="btn btn-secondary"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>
    );
  }
}
