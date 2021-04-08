import React from 'react';

import users from '../api/users';

export class Form extends React.PureComponent {
  state = {
    newTitle: '',
    userName: '',
    hidden: true,
  }

  handleNewTitle = (event) => {
    this.setState({
      newTitle: event.target.value,
    });
  }

  handleUserName = (event) => {
    this.setState({
      userName: event.target.value,
    });
  }

  handleForm = (event) => {
    event.preventDefault();

    const { userName, newTitle } = this.state;

    if (userName && newTitle) {
      this.props.addNewUser(userName, newTitle);
      this.setState({
        hidden: true,
      });
    }

    if (!userName && !newTitle) {
      this.setState({
        hidden: false,
      });
    }
  }

  render() {
    const { list } = this.props;
    const { userName, newTitle } = this.state;

    return (
      <form onSubmit={this.handleForm}>
        <table className="table table-dark table-striped table-hover">
          <thead>
            <tr>
              <th>
                <select
                  className="form-select"
                  // required
                  aria-label="select example"
                  value={userName}
                  onChange={this.handleUserName}
                >
                  <option value="">Choose a user</option>
                  {users.map(user => (
                    <option
                      key={user.id}
                    >
                      {user.name}
                    </option>
                  ))}
                </select>
              </th>
              <th>
                <button
                  className="btn btn-success"
                  type="submit"
                >
                  Add
                </button>
              </th>
              <th>
                <input
                  placeholder="Please enter the title"
                  type="text"
                  className="form-control"
                  aria-describedby="inputGroupPrepend"
                  value={newTitle}
                  onChange={this.handleNewTitle}
                  // required
                />
              </th>
            </tr>
            <tr
              className="table table-danger"
              hidden={this.state.hidden}
            >
              <th>Choose a user</th>
              <th> </th>
              <th>Please enter the title</th>
            </tr>
            <tr className="table table-success">
              <th>User name</th>
              <th>Completed</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {list.map(todo => (
              <tr key={todo.id}>
                <th>{todo.user.name}</th>
                <th>
                  Completed:
                  {` ${todo.completed}`}
                </th>
                <th>{todo.title}</th>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    );
  }
}
