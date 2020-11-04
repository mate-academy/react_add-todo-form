import React from 'react';
import './AddTodoForm.css'
export class AddTodoForm extends React.PureComponent {

  state = {
    title: '',
    userName: '',
    titleError: false,
    userNameError: false,
  }

  handleChange = (event) => {
    const { name, value, type } = event.target;

    this.setState({
      [name]: type === 'text'
        ? value.replace(/\d|[&\\#,+()$~%.'":*?<>{}!]/g, '')
        : value,
      [`${name}Error`]: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userName } = this.state;
    const { addTodo, users } = this.props;

    if (!title.trim()) {
      this.setState({ titleError: true });
    }


    if (userName === 'Choose a user' || !userName) {
      this.setState({ userNameError: true });
    }

    if (title.trim() && userName) {
      const newUser = users.find(user => user.name === userName);

      this.setState({
        title: '',
        userName: '',
      });
      addTodo(title, newUser);
    }
  }
  render() {
    const { users } = this.props;
    const {
      title,
      userName,
      titleError,
      userNameError,
    } = this.state;

    return (
      <form
        className="ui form"
        onSubmit={this.handleSubmit}
      >
        <div className="three fields">
          <div className="field">
          <label>Choose User</label>
          <select
            className="ui fluid dropdown"
            name="userName"
            id="userName"
            value={userName}
            onChange={this.handleChange}>
            <option value="">
              Choose a user
            </option>
            {users.map(user => (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userNameError && <div className="ui red message">Please choose a user</div>}
          </div>
          <div className="field">
            <label>Enter Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Task title"
              value={title}
              onChange={this.handleChange}
            />
              {titleError && <div className="ui red message">Please enter the title</div>}
          </div>
        </div>
        <button className="ui button primary" type="submit">Add Task</button>
      </form>
    )
  };
}

export default AddTodoForm;


