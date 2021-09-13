import React from 'react';
import { uuid } from 'uuidv4';
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
  state: State = {
    inputTitle: '',
    selectedName: '',
    isTitle: false,
    isName: false,
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === 'inputTitle') {
      this.setState({
        [name]: value,
      });
    }

    if (name === 'selectedName') {
      this.setState({
        [name]: value,
      });
    }
  };

  clearState = () => {
    this.setState({
      inputTitle: '',
      selectedName: '',
      isTitle: false,
      isName: false,
    });
  };

  submitTodo = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      inputTitle,
      selectedName,
    } = this.state;

    if (!inputTitle) {
      this.setState({ isTitle: true });
    }

    if (!selectedName) {
      this.setState({ isName: true });
    }

    if (inputTitle && selectedName) {
      const newTodo = {
        id: uuid(),
        title: inputTitle,
        user: users.find(user => user.name === selectedName),
      } as Todo;

      this.props.addTodo(newTodo);
      this.clearState();
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
            onChange={this.handleChange}
          />
          {this.state.isTitle && (
            <p className="alert alert-danger">Please enter the title</p>
          )}
        </label>

        <label htmlFor="users" className="App__label">
          <select
            className="form-control"
            name="selectedName"
            id="users"
            required
            value={this.state.selectedName}
            onChange={this.handleChange}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.name}>
                {user.name}
              </option>
            ))}
          </select>
          {this.state.isName && (
            <p className="alert alert-danger">Please choose a user</p>
          )}
        </label>

        <button type="submit" className="btn btn-secondary">ADD</button>
      </form>
    );
  }
}
