import React from 'react';
import usersFromServer from '../../api/users';

type State = {
  title: string,
  userId: number,
  selectError: string | null,
  titleError: string | null,
};

type Props = {
  addTodo: (userId: number, title: string) => void;
};

export class TodoForm extends React.Component<Props, State> {
  state = {
    title: '',
    userId: 0,
    selectError: null,
    titleError: null,
  };

  titleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = event.target.value.replaceAll(/[^0-9a-zA-Z а-яА-ЯІі.,'!?]/g, '');

    this.setState({ title: isValid, titleError: null });
  };

  selectUser = (event:React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({ userId: Number(event.target.value), selectError: null });
  };

  validation = () => {
    if (this.state.title.length === 0) {
      this.setState({ titleError: 'Please enter Your text' });

      return;
    }

    if (this.state.userId === 0) {
      this.setState({ selectError: 'Please choose a User' });

      return;
    }

    this.props.addTodo(this.state.userId, this.state.title);

    this.setState({
      title: '',
      userId: 0,
      selectError: null,
      titleError: null,
    });
  };

  render() {
    return (
      <form
        className="todo__form"
        action=""
        method="Post"
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        { this.state.titleError
          && (
            <p className="todo__error">
              {this.state.titleError}
            </p>
          )}

        <label htmlFor="title">
          <input
            className="todo__input"
            type="text"
            name="title"
            placeholder="Enter your text"
            value={this.state.title}
            onChange={(event) => {
              this.titleChange(event);
            }}
          />
        </label>

        <label htmlFor="userId">
          <select
            className="todo__select"
            name="userId"
            id="userId"
            value={this.state.userId}
            onChange={(event) => {
              this.selectUser(event);
            }}
          >
            <option value="0" disabled>Choose User</option>
            {usersFromServer.map(user => (
              <option value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>

        { this.state.selectError
          && (
            <p className="todo__error">
              {this.state.selectError}
            </p>
          )}

        <button
          className="button"
          type="submit"
          onClick={this.validation}
        >
          Add TODO
        </button>
      </form>
    );
  }
}
