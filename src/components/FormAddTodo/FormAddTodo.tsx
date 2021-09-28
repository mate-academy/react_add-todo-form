import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

type State = {
  title: string;
  userName: number;
  isTitleEmpty: boolean;
  isUserNameEmpty: boolean,
};

type Props = {
  todoList: Todo[];
  usersList: User[];
  addTodo: (newTodo: Todo) => void;
};

export class FormAddTodo extends React.Component<Props, State> {
  lastId = Math.max(...this.props.todoList.map((todo) => todo.id)) + 1;

  state: State = {
    title: '',
    userName: 0,
    isTitleEmpty: false,
    isUserNameEmpty: false,
  };

  clearState = () => {
    this.setState({
      title: '',
      userName: 0,
      isTitleEmpty: false,
      isUserNameEmpty: false,
    });
  };

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      title: value,
      isTitleEmpty: false,
    });
  };

  handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      userName: +value,
      isUserNameEmpty: false,
    });
  };

  validation = () => {
    const {
      userName,
      title,
    } = this.state;

    let valid = true;

    if ((!userName)) {
      this.setState({
        isUserNameEmpty: true,
      });

      valid = false;
    }

    if (!title.trim()) {
      this.setState({
        isTitleEmpty: true,
      });

      valid = false;
    }

    return valid;
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const isValid = this.validation();

    if (isValid) {
      this.props.addTodo({
        id: this.lastId,
        title: this.state.title,
        completed: false,
        userId: this.state.userName,
        user: this.props.usersList.find(user => this.state.userName === user.id) || null,
      });
      this.lastId += 1;

      this.clearState();
    }
  };

  render() {
    const { usersList } = this.props;
    const { title, isTitleEmpty, isUserNameEmpty } = this.state;

    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
        >
          <fieldset>
            <legend>Add new TODOs</legend>
            <div className="mb-3">
              <input
                type="text"
                value={title}
                onChange={this.handleChangeTitle}
                className="form-control"
                placeholder="TODO"
              />
              {isTitleEmpty && ('Please enter the title')}
            </div>
            <div className="mb-3">
              <select
                id="disabledSelect"
                className="form-select"
                name="user"
                value={this.state.userName}
                onChange={this.handleChangeUser}
              >
                <>
                  <option value={0}>
                    Choose a user
                  </option>
                </>
                {usersList.map(user => (
                  <option
                    key={user.id}
                    value={user.id}
                  >
                    {user.name}
                  </option>
                ))}
              </select>
              {isUserNameEmpty && 'Please choose a user'}
            </div>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Add
            </button>
          </fieldset>
        </form>
      </div>
    );
  }
}
