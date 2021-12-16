import React from 'react';

import { Todo } from '../types/Todo';
import { User } from '../types/User';

type Props = {
  todoList: Todo[],
  users: User[],
};

type State = {
  todoList: Todo[],
  taskTitle: string,
  userName: string,
  isTitleEmpty: boolean,
  isNameEmpty: boolean,
};

export class TodoList extends React.Component<Props, State> {
  state = {
    todoList: [...this.props.todoList],
    taskTitle: '',
    userName: '',
    isTitleEmpty: false,
    isNameEmpty: false,
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { taskTitle, userName } = this.state;

    this.setState({ isTitleEmpty: !taskTitle, isNameEmpty: !userName });

    if (!taskTitle || !userName) {
      return;
    }

    this.addTodo();
    this.clearForm();
  };

  clearForm = () => {
    this.setState({
      taskTitle: '',
      userName: '',
    });
  };

  addTodo = () => {
    const {
      todoList,
      taskTitle,
      userName,
    } = this.state;
    const { users: usersFromSer } = this.props;

    const user = usersFromSer.find(({ name }) => name === userName) || null;

    const newTodo: Todo = {
      userId: user && user.id,
      id: todoList.length + 1,
      title: taskTitle,
      completed: false,
      user: user || null,
    };

    this.setState(state => ({ todoList: [...state.todoList, newTodo] }));
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userName: event.target.value,
      isNameEmpty: !event.target.value,
    });
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      taskTitle: event.target.value,
      isTitleEmpty: !event.target.value,
    });
  };

  render() {
    const { users } = this.props;
    const { todoList, isTitleEmpty, isNameEmpty } = this.state;
    const {
      handleSubmit,
      handleSelectChange,
      handleInputChange,
    } = this;

    return (
      <div className="todo-app">
        <form onSubmit={handleSubmit} className="form">
          <select
            onChange={handleSelectChange}
            value={this.state.userName}
            className="form__select"
          >
            <option disabled={Boolean(this.state.userName)}>
              Choose a user
            </option>
            {users.map(({ name, id }) => (
              <option key={id}>
                {name}
              </option>
            ))}
          </select>
          {isNameEmpty && (
            <div className="form__select-error">
              Please choose a user
            </div>
          )}

          <input
            type="text"
            placeholder="Enter the title"
            value={this.state.taskTitle}
            onChange={handleInputChange}
            className="form__input"
          />
          {isTitleEmpty && (
            <div className="form__input-error">
              Please enter the title
            </div>
          )}

          <button
            type="submit"
            className="form__button"
          >
            Add task
          </button>
        </form>
        <ul>
          {todoList.map(({ id, title, user }) => (
            <li key={id} className="todo-card">
              <h3 className="todo-card__title">{title}</h3>
              <div className="user-info">
                <span className="user-info__name">{user && user.name}</span>
                <span className="user-info__email">{user && user.email}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
