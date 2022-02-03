import React from 'react';
import './NewTodoForm.scss';
import users from '../../api/users';

function maxId(arr: Todo[]) {
  let max = 1;

  for (let i = 0; i < arr.length; i += 1) {
    if (arr[i].id > max) {
      max = arr[i].id;
    }
  }

  return max;
}

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

  clearState = () => {
    this.setState({
      newTodoName: '',
      selectedUserId: 0,
      hasTitleError: false,
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
      id: maxId(allTodos) + 1,
      title: newTodoName,
      completed: true,
      user: users.find(user => user.id === selectedUserId) || null,
    };

    this.props.addNewTodo(newTodo);
    this.clearState();
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
        className="form"
      >
        <section>
          <input
            type="text"
            placeholder="Title"
            className="input"
            value={newTodoName}
            onChange={this.handleTodoChange}
          />
          {hasTitleError && (
            <span className="validation">Please enter the title</span>
          )}
        </section>

        <section>
          <select
            className="input"
            value={selectedUserId}
            onChange={this.handleUserChange}
          >
            <option value="0">Choose a user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {hasUserError && (
            <span className="validation">Please choose a user</span>
          )}
        </section>

        <button type="submit" className="input button">Add</button>
      </form>
    );
  }
}
