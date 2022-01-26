import React from 'react';
import users from '../../api/users';
import { findUserById, newId } from '../../helpers';
import './Form.scss';

type Props = {
  todos: Todo[],
  addNewTodo: (newTodo: Todo) => void,
};
type State = {
  newTodoName: string,
  selectedUserId: number,
  hasTodoNameError: boolean,
  hasSelectUserError: boolean,
};

export class AddTodosForm extends React.Component<Props, State> {
  state: State = {
    newTodoName: '',
    selectedUserId: 0,
    hasTodoNameError: false,
    hasSelectUserError: false,
  };

  handleAddName = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodoName: event.target.value,
      hasTodoNameError: false,
    });
  };

  handleSelectedUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUserId: +event.target.value,
      hasSelectUserError: false,
    });
  };

  clearState = () => {
    this.setState({
      newTodoName: '',
      selectedUserId: 0,
      hasTodoNameError: false,
      hasSelectUserError: false,
    });
  };

  handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      newTodoName,
      selectedUserId,
    } = this.state;

    const newTodo = this.getNewTodo();

    if (newTodoName && selectedUserId) {
      this.props.addNewTodo(newTodo);
      this.clearState();
    }

    if (!newTodoName || !selectedUserId) {
      this.setState({
        hasSelectUserError: !selectedUserId,
        hasTodoNameError: !newTodoName,
      });
    }
  };

  getNewTodo = () => {
    const {
      newTodoName,
      selectedUserId,
    } = this.state;
    const { todos } = this.props;

    return {
      userId: selectedUserId,
      id: newId([...todos]),
      title: newTodoName,
      completed: false,
      user: findUserById(selectedUserId) || null,
    };
  };

  render() {
    const {
      newTodoName,
      selectedUserId,
      hasSelectUserError,
      hasTodoNameError,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmitForm} className="form">
        <section>
          <input
            type="text"
            className="form__input"
            placeholder="Add a task"
            value={newTodoName}
            onChange={this.handleAddName}
          />
          <div className="form__error-container">
            {hasTodoNameError && (
              <span className="form__error">Please enter a task</span>
            )}
          </div>
        </section>

        <section>
          <select
            className="form__select"
            value={selectedUserId}
            onChange={this.handleSelectedUser}
          >
            <option value="0">Choose an user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          <div className="form__error-container">
            {hasSelectUserError && (
              <span className="form__error">Please choose an user</span>
            )}
          </div>
        </section>

        <button className="form__button" type="submit">Add</button>
      </form>
    );
  }
}
