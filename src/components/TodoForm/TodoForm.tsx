import React, { ChangeEvent, FormEvent } from 'react';
import { User } from '../../types/types';

interface State {
  title: {
    value: string;
    error: boolean;
  }
  user: {
    value: number;
    error: boolean;
  }
}

type Props = {
  users: User[];
  onAdd: (todoTextInput: string, selectedUserId: number) => void;
};

export class TodoForm extends React.Component<Props, State> {
  state = {
    title: {
      value: '',
      error: false,
    },
    user: {
      value: 0,
      error: false,
    },
  };

  changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: { value: e.target.value, error: false } });
  };

  changeUserHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ user: { value: +e.target.value, error: false } });
  };

  submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { onAdd } = this.props;

    this.checkError('title');
    this.checkError('user');

    if (this.state.title.value && this.state.user.value) {
      onAdd(this.state.title.value, this.state.user.value);
    }
  };

  checkError = (inputName: keyof State) => {
    this.setState((currentState) => {
      return {
        [inputName]: {
          value: currentState[inputName].value,
          error: !currentState[inputName].value,
        },
      } as Pick<State, keyof State>;
    });
  };

  render() {
    const [title, user] = Object.keys(this.state);
    const { value } = this.state.user;
    const { users } = this.props;

    return (
      <form
        onSubmit={this.submitHandler}
      >
        <label htmlFor={title}>
          Choose a user:
          <select
            name={title}
            value={value}
            onChange={this.changeUserHandler}
          >
            <option value="0" disabled>Chose a user</option>
            {users.map(({ id, name }) => {
              return <option value={id} key={id}>{name}</option>;
            })}
          </select>
        </label>
        {this.state.user.error && <p>Please choose a user</p>}

        <label htmlFor={user}>
          Enter the title:
          <input
            name={user}
            type="text"
            onChange={this.changeTitleHandler}
          />
        </label>
        {this.state.title.error && <p>Please enter the title</p>}

        <button type="submit">Add</button>
      </form>
    );
  }
}
