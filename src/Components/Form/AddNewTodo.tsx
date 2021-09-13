import React from 'react';

interface Props {
  users: User[];
  tasks: Todo[];
  addTodo: (todo: Todo) => void,
}

interface State {
  title: string;
  userId: number;
  isTitleEmpty: boolean;
  isSelectUser: boolean;
}

export class AddNewTodo extends React.Component<Props, State> {
  state: State = {
    title: '',
    userId: 0,
    isTitleEmpty: false,
    isSelectUser: false,
  };

  resetForm = () => {
    this.setState({
      title: '',
      userId: 0,
      isTitleEmpty: false,
      isSelectUser: false,
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: +event.target.value,
    });
  };

  getValueFromForm = (event: React.FormEvent) => {
    event.preventDefault();
    const { userId, title } = this.state;

    if (title.trim().length === 0) {
      this.setState(currentState => ({
        isTitleEmpty: !currentState.isTitleEmpty,
      }));

      return;
    }

    if (userId === 0) {
      this.setState(currentState => ({
        isSelectUser: !currentState.isSelectUser,
      }));

      return;
    }

    const newTodo = {
      userId,
      id: this.getMaxId(),
      title,
      user: this.props.users.find(user => user.id === this.state.userId),
    };

    this.props.addTodo(newTodo);
    this.resetForm();
  };

  getMaxId = () => {
    const { tasks } = this.props;
    let max = tasks[0].id;

    tasks.forEach((todo) => {
      if (todo.id > max) {
        max = todo.id;
      }
    });

    return max + 1;
  };

  render() {
    const { users } = this.props;
    const {
      title,
      userId,
      isTitleEmpty,
      isSelectUser,
    } = this.state;

    return (
      <div className="container d-flex flex-column">
        <div className="row mb-3">
          <form className="form-todo" onSubmit={this.getValueFromForm}>
            <div className="input-group d-flex justify-content-evenly">
              <div className="col-sm-5 mr-3">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Write your task here"
                  name="title"
                  id="titleTodo"
                  value={title}
                  onChange={this.handleChange}
                />
                {isTitleEmpty
                  && <span className="error">Please enter the title!</span>}
              </div>
              <div className="col-sm-5 mr-3">
                <select
                  className="form-select"
                  name="userId"
                  value={userId}
                  onChange={this.handleSelectChange}
                >
                  <option value="">Choose a user</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
                {isSelectUser
                  && <span className="error">Please select user!</span>}
              </div>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <button
                type="submit"
                className="btn btn-success btn-lg"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
