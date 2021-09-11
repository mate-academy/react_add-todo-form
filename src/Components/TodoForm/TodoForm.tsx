import React from 'react';
import { Todo } from '../../react-app-env';

import users from '../../api/users';

interface Props {
  addTodo: (todo: Todo) => void;
}

interface State {
  inputTitle: string,
  selectedName: string,
  isTitle: boolean,
  isName: boolean,
}

export class TodoForm extends React.Component<Props, State> {
  state = {
    inputTitle: '',
    selectedName: '',
    isTitle: false,
    isName: false,
  };

  submitTodo = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      inputTitle,
      selectedName,
    } = this.state;

    this.setState(() => ({ isTitle: !inputTitle }));
    this.setState(() => ({ isName: !selectedName }));

    if (inputTitle && selectedName) {
      const newTodo = {
        title: inputTitle,
        user: users.find(user => user.name === selectedName),
      } as Todo;

      this.props.addTodo(newTodo);

      this.setState(() => ({
        inputTitle: '',
        selectedName: '',
        isTitle: false,
        isName: false,
      }));
    }
  };

  render() {
    return (
      <form
        className="App__form"
        noValidate
        onSubmit={this.submitTodo}
      >
        <label htmlFor="todo" className="App__label">
          <input
            className="form-control"
            type="text"
            id="todo"
            name="inputTitle"
            placeholder="add todo"
            pattern="[A-Za-zа-яА-ЯЁё0-9]+"
            required
            value={this.state.inputTitle}
            onChange={(event) => (
              this.setState({ inputTitle: event.target.value })
            )}
          />
          {this.state.isTitle && <p className="alert alert-danger">Please enter the title</p>}
        </label>

        <label htmlFor="users" className="App__label">
          <select
            className="form-control"
            name="selectedName"
            id="users"
            required
            value={this.state.selectedName}
            onChange={(event) => {
              this.setState({ selectedName: event.target.value });
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>
          {this.state.isName
            && <p className="alert alert-danger">Please choose a user</p>}
        </label>

        <button type="submit" className="btn btn-secondary">ADD</button>
      </form>
    );
  }
}
