import React from 'react';
import { uuid } from 'uuidv4';
import './TodoList.scss';

type Props = {
  todos: Todo[];
  users: User[];
  addTodo: (todo: Todo) => void;
};

interface State {
  title: string;
  userId: number;
  isTitle: boolean;
  isUserChoose: boolean;
}

export class TodoList extends React.Component<Props, State> {
  state: State = {
    title: '',
    userId: 0,
    isTitle: true,
    isUserChoose: true,
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      title: value,
      isTitle: true,
    });
  };

  handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    // eslint-disable-next-line no-console
    console.log(value); // select value

    this.setState({
      userId: +value,
      isUserChoose: true,
    });
  };

  clearForm = () => {
    this.setState({
      title: '',
      userId: 0,
      isTitle: true,
      isUserChoose: true,
    });
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (this.state.title.trim().length === 0) {
      this.setState((currentState) => ({
        isTitle: !currentState.isTitle,
      }));

      return;
    }

    if (this.state.userId === 0) {
      this.setState((currentState) => ({
        isUserChoose: !currentState.isUserChoose,
      }));

      return;
    }

    const newTodo = {
      uuid: uuid(),
      title: this.state.title,
      completed: false,
      userId: this.state.userId,
      user: this.props.users.find(user => (
        user.id === this.state.userId)) || null,
    };

    // eslint-disable-next-line no-console
    console.log('submit', newTodo);

    this.props.addTodo(newTodo);
    this.clearForm();
  };

  render() {
    const { todos, users } = this.props;

    return (
      <div className="TodoList">
        <form
          onSubmit={this.handleSubmit}
          className="TodoList__form container col-2"
        >
          <fieldset className="TodoList__form">
            <legend>
              Creat new TODO
            </legend>

            <div className="TodoList__form-input mb-4">
              <input
                type="text"
                name="title"
                id="title"
                value={this.state.title}
                onChange={this.changeHandler}
                placeholder="add task"
                className="form-control"
                aria-describedby="titleWarning"
              />
              <span id="titleWarning" className="form-text">
                {!this.state.isTitle
                  && <span className="error-message">Please enter the title</span>}
              </span>
            </div>

            <div className="TodoList__form-input mb-4">
              <select
                name="username"
                id="username"
                value={this.state.userId}
                onChange={this.handleSelect}
                aria-describedby="selectWarning"
                className="col-2 form-select"
              >
                <option value="">Choose a user</option>
                {users.map((user) => (
                  <option
                    value={user.id}
                    key={user.id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>

              <span id="selectWarning" className="form-text">
                {!this.state.isUserChoose
                  && <span className="error-message">Please choose a user</span>}
              </span>
            </div>

            <button type="submit" className="btn btn-primary col-12">Add</button>

          </fieldset>
        </form>

        <ul className="todo-list list-group">
          {
            todos.map(todo => (
              <li key={todo.uuid} className="todo-list__item list-group-item d-grid">
                <div className="row">
                  <div className="col">
                    {todo.title}
                  </div>

                  <div className="col">
                    {todo.user?.name}
                  </div>

                  <div className="col">
                    {todo.user?.username}
                  </div>

                  <div className="col">
                    {todo.user?.email}
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}
