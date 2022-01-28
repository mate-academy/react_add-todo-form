import React from 'react';
import users from '../../api/users';

type Props = {
  allTodos: Todo[];
  addNewTodo: (newTodo: Todo) => void;
};
type State = {
  newTodoName: string;
  selectedUserId: number;
  hasTitleError: boolean;
  hasUserError: boolean;
};

export class NewTodoForm extends React.Component<Props, State> {
  state: State = {
    newTodoName: '',
    selectedUserId: 0,
    hasTitleError: false,
    hasUserError: false,
  };

  handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      newTodoName: event.target.value,
      hasTitleError: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUserId: +event.target.value,
      hasUserError: false,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { newTodoName, selectedUserId } = this.state;
    const { allTodos } = this.props;

    if (!newTodoName || !selectedUserId) {
      this.setState({
        hasTitleError: !newTodoName,
        hasUserError: !selectedUserId,
      });

      return;
    }

    const newTodo: Todo = {
      userId: selectedUserId,
      id: allTodos.length + 1,
      title: newTodoName,
      completed: true,
      user: users.find(user => user.id === selectedUserId) || null,
    };

    this.props.addNewTodo(newTodo);
  };

  render() {
    const {
      newTodoName,
      selectedUserId,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
      >
        <section>
          <input
            type="text"
            placeholder="Title"
            value={newTodoName}
            onChange={this.handleTodoChange}
          />
          {hasTitleError && (
            <span>Please enter the title</span>
          )}
        </section>

        <section>
          <select
            value={selectedUserId}
            onChange={this.handleUserChange}
          >
            <option value="0">Choose a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {hasUserError && (
            <span>Please choose a user</span>
          )}
        </section>

        <button type="submit">Add</button>
      </form>
    );
  }
}
